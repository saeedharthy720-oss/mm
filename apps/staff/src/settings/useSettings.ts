import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface StoreProfile {
  nameEn: string;
  nameAr: string;
  whatsappNumber: string;
  currency: string;
}

const SETTINGS_KEY = ["settings"];

export function useSettings() {
  return useQuery({
    queryKey: SETTINGS_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<{ settings: Record<string, unknown> }>("/api/v1/settings");
      return data.settings;
    }
  });
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: unknown }) => {
      await apiClient.patch(`/api/v1/settings/${key}`, { value });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SETTINGS_KEY })
  });
}
