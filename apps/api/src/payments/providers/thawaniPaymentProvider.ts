import { env } from "../../config/env.js";
import type {
  CreateCheckoutSessionInput,
  CreateCheckoutSessionResult,
  PaymentProvider,
  PaymentStatusResult,
  WebhookEvent
} from "../paymentProvider.interface.js";

interface ThawaniSessionData {
  session_id: string;
  payment_status: string;
  metadata?: { order_id?: string };
}

function mapThawaniStatus(status: string): PaymentStatusResult {
  switch (status) {
    case "paid":
      return "succeeded";
    case "unpaid":
      return "pending";
    case "refunded":
      return "refunded";
    default:
      return "failed";
  }
}

/**
 * Thawani (https://thawani.om) session-based hosted checkout.
 * Implemented against Thawani's publicly documented checkout-session API.
 * Verify field names against Thawani's current docs / a sandbox account before
 * going live — this integration has not been exercised against a live account.
 */
export class ThawaniPaymentProvider implements PaymentProvider {
  readonly name = "thawani";

  private get payBaseUrl(): string {
    return (env.THAWANI_BASE_URL ?? "").replace(/\/api\/v1\/?$/, "");
  }

  private assertConfigured() {
    if (!env.THAWANI_API_KEY || !env.THAWANI_PUBLISHABLE_KEY || !env.THAWANI_BASE_URL) {
      throw new Error(
        "Thawani is not configured — set THAWANI_API_KEY, THAWANI_PUBLISHABLE_KEY, and THAWANI_BASE_URL"
      );
    }
  }

  private async fetchSession(sessionId: string): Promise<ThawaniSessionData> {
    this.assertConfigured();

    const response = await fetch(`${env.THAWANI_BASE_URL}/checkout/session/${sessionId}`, {
      headers: { "thawani-api-key": env.THAWANI_API_KEY! }
    });

    if (!response.ok) {
      throw new Error(`Thawani session lookup failed: ${response.status} ${await response.text()}`);
    }

    const body = (await response.json()) as { data: ThawaniSessionData };
    return body.data;
  }

  async createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult> {
    this.assertConfigured();

    const response = await fetch(`${env.THAWANI_BASE_URL}/checkout/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "thawani-api-key": env.THAWANI_API_KEY!
      },
      body: JSON.stringify({
        client_reference_id: input.orderNumber,
        mode: "payment",
        products: [
          {
            name: `Order ${input.orderNumber}`,
            quantity: 1,
            // Thawani amounts are in baisa (OMR x 1000).
            unit_amount: Math.round(input.amount * 1000)
          }
        ],
        success_url: input.successRedirectUrl,
        cancel_url: input.cancelRedirectUrl,
        metadata: {
          order_id: input.orderId,
          customer_name: input.customerName,
          customer_phone: input.customerPhone
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Thawani session creation failed: ${response.status} ${await response.text()}`);
    }

    const body = (await response.json()) as { data: { session_id: string } };
    const sessionId = body.data.session_id;

    return {
      checkoutUrl: `${this.payBaseUrl}/pay/${sessionId}?key=${env.THAWANI_PUBLISHABLE_KEY}`,
      providerReference: sessionId
    };
  }

  verifyWebhookSignature(): boolean {
    // Thawani does not publish a documented webhook-signing scheme. Rather than trust an
    // unverifiable payload, parseWebhookEvent re-queries the session status server-to-server
    // (authenticated with our own secret key) and treats that as the source of truth.
    return true;
  }

  async parseWebhookEvent(rawBody: Buffer): Promise<WebhookEvent> {
    const payload = JSON.parse(rawBody.toString("utf8")) as {
      data?: { session_id?: string };
      session_id?: string;
    };
    const sessionId = payload.data?.session_id ?? payload.session_id;
    if (!sessionId) throw new Error("Thawani webhook payload missing session_id");

    const session = await this.fetchSession(sessionId);
    const orderId = session.metadata?.order_id;
    if (!orderId) throw new Error("Thawani session metadata missing order_id");

    const status = mapThawaniStatus(session.payment_status);

    return {
      providerReference: sessionId,
      orderId,
      status: status === "refunded" ? "failed" : status,
      raw: session
    };
  }

  async getPaymentStatus(providerReference: string): Promise<PaymentStatusResult> {
    const session = await this.fetchSession(providerReference);
    return mapThawaniStatus(session.payment_status);
  }
}
