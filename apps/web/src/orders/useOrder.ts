import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface OrderItem {
  id: string;
  productNameSnapshot: string;
  unitLabelSnapshot: string;
  quantity: number;
  unitPrice: string;
  deliveryChargeSnapshot: string;
  lineTotal: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddressText: string;
  deliveryNotes: string | null;
  orderNotes: string | null;
  paymentMethod: "card" | "pay_on_delivery";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  subtotal: string;
  deliveryChargeTotal: string;
  total: string;
  createdAt: string;
  items: OrderItem[];
  status: { key: string; labelEn: string; labelAr: string };
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ order: Order }>(`/api/v1/orders/${id}`);
      return data.order;
    },
    enabled: Boolean(id)
  });
}
