import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface OrderItem {
  id: string;
  productId: string | null;
  productNameSnapshot: string;
  unitLabelSnapshot: string;
  quantity: number;
  unitPrice: string;
  deliveryChargeSnapshot: string;
  lineTotal: string;
}

export interface OrderStatusHistoryEntry {
  id: string;
  changedAt: string;
  note: string | null;
  status: { key: string; labelEn: string; labelAr: string };
}

export interface OrderDetail {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddressText: string;
  deliveryLat: string | null;
  deliveryLng: string | null;
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
  statusHistory: OrderStatusHistoryEntry[];
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ order: OrderDetail }>(`/api/v1/orders/${id}`);
      return data.order;
    },
    enabled: Boolean(id)
  });
}

export interface DeleteOrderResult {
  orderNumber: string;
  /** Whether the order's quantities went back into stock. Decided server-side. */
  stockRestored: boolean;
  itemsRemoved: number;
}

export function useDeleteOrder(orderId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.delete<DeleteOrderResult>(`/api/v1/orders/${orderId}`);
      return data;
    },
    onSuccess: () => {
      // The order is gone, so its cached detail has to go with it — leaving it
      // behind would let a stale copy render if the route is revisited.
      queryClient.removeQueries({ queryKey: ["orders", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"], exact: false });
      // Stock changed for most deletions, so the product lists are stale too.
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    }
  });
}

export function useUpdateOrderStatus(orderId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { statusKey: string; note?: string }) => {
      const { data } = await apiClient.patch<{ order: OrderDetail }>(
        `/api/v1/orders/${orderId}/status`,
        input
      );
      return data.order;
    },
    onSuccess: (order) => {
      queryClient.setQueryData(["orders", orderId], order);
      queryClient.invalidateQueries({ queryKey: ["orders"], exact: false });
    }
  });
}
