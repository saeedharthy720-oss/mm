import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface MyOrderItem {
  id: string;
  productNameSnapshot: string;
  unitLabelSnapshot: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
}

export interface MyOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  paymentMethod: "card" | "pay_on_delivery";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  subtotal: string;
  deliveryChargeTotal: string;
  total: string;
  deliveryAddressText: string;
  status: { key: string; labelEn: string; labelAr: string };
  items: MyOrderItem[];
}

export interface MyOrdersResult {
  items: MyOrder[];
  page: number;
  pageSize: number;
  total: number;
}

/**
 * The customer's own orders. Scoped server-side by the session's customer id —
 * there is no parameter here to tamper with.
 */
export function useMyOrders() {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data } = await apiClient.get<MyOrdersResult>("/api/v1/orders/mine");
      return data;
    }
  });
}
