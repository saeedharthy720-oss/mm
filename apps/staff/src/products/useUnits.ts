import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface Unit {
  id: string;
  key: string;
  labelEn: string;
  labelAr: string;
  isCustom: boolean;
}

export function useUnits() {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ units: Unit[] }>("/api/v1/units");
      return data.units;
    }
  });
}
