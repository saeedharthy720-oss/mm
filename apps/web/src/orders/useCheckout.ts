import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface CheckoutItem {
  productId: string;
  quantity: number;
}

export interface CheckoutInput {
  customerName: string;
  customerPhone: string;
  deliveryAddressText: string;
  deliveryLat?: number;
  deliveryLng?: number;
  deliveryNotes?: string;
  orderNotes?: string;
  paymentMethod: "card" | "pay_on_delivery";
  items: CheckoutItem[];
}

export interface CheckoutResult {
  order: { id: string; orderNumber: string };
  checkoutUrl?: string;
}

export function useCheckout() {
  return useMutation({
    mutationFn: async (input: CheckoutInput) => {
      const { data } = await apiClient.post<CheckoutResult>("/api/v1/orders", input);
      return data;
    }
  });
}
