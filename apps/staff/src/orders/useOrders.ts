import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface OrderListItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: "card" | "pay_on_delivery";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  total: string;
  createdAt: string;
  status: { key: string; labelEn: string; labelAr: string };
}

export interface OrderListResult {
  items: OrderListItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface OrderFilters {
  status?: string;
  search?: string;
  page?: number;
}

export function useOrders(filters: OrderFilters) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: async () => {
      const { data } = await apiClient.get<OrderListResult>("/api/v1/orders", {
        params: {
          status: filters.status || undefined,
          search: filters.search || undefined,
          page: filters.page ?? 1,
          pageSize: 20
        }
      });
      return data;
    },
    refetchInterval: 30000
  });
}
