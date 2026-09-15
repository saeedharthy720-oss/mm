import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface OrderStatus {
  id: string;
  key: string;
  labelEn: string;
  labelAr: string;
  sortOrder: number;
}

export function useOrderStatuses() {
  return useQuery({
    queryKey: ["order-statuses"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ statuses: OrderStatus[] }>("/api/v1/order-statuses");
      return data.statuses;
    },
    staleTime: 5 * 60 * 1000
  });
}
