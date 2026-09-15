import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface StoreProfile {
  nameEn: string;
  nameAr: string;
  whatsappNumber: string;
  currency: string;
}

export function usePublicSettings() {
  return useQuery({
    queryKey: ["public-settings"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ store_profile: StoreProfile | null }>(
        "/api/v1/settings/public"
      );
      return data.store_profile;
    },
    staleTime: 5 * 60 * 1000
  });
}
