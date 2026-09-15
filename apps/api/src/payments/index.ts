import { ThawaniPaymentProvider } from "./providers/thawaniPaymentProvider.js";
import type { PaymentProvider } from "./paymentProvider.interface.js";

export function createPaymentProvider(): PaymentProvider {
  return new ThawaniPaymentProvider();
}

export type * from "./paymentProvider.interface.js";
