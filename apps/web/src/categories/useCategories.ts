import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ categories: Category[] }>("/api/v1/categories");
      return data.categories;
    }
  });
}
