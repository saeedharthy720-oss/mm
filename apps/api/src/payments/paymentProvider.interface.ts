export interface CreateCheckoutSessionInput {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  customerName: string;
  customerPhone: string;
  successRedirectUrl: string;
  cancelRedirectUrl: string;
}

export interface CreateCheckoutSessionResult {
  checkoutUrl: string;
  providerReference: string;
}

export type PaymentEventStatus = "succeeded" | "failed" | "pending";

export interface WebhookEvent {
  providerReference: string;
  orderId: string;
  status: PaymentEventStatus;
  raw: unknown;
}

export type PaymentStatusResult = "pending" | "succeeded" | "failed" | "refunded";

export interface PaymentProvider {
  readonly name: string;
  createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult>;
  verifyWebhookSignature(rawBody: Buffer, headers: Record<string, string>): boolean;
  parseWebhookEvent(rawBody: Buffer, headers: Record<string, string>): Promise<WebhookEvent>;
  getPaymentStatus(providerReference: string): Promise<PaymentStatusResult>;
}
