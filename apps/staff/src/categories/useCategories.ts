import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const CATEGORIES_KEY = ["categories"];

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<{ categories: Category[] }>("/api/v1/categories", {
        params: { includeInactive: "true" }
      });
      return data.categories;
    }
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { nameEn: string; nameAr: string; parentId: string | null }) => {
      const { data } = await apiClient.post<{ category: Category }>("/api/v1/categories", input);
      return data.category;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY })
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: Partial<Category> & { id: string }) => {
      const { data } = await apiClient.patch<{ category: Category }>(`/api/v1/categories/${id}`, input);
      return data.category;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY })
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/v1/categories/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY })
  });
}

export function useReorderCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: { id: string; sortOrder: number }[]) => {
      await apiClient.patch("/api/v1/categories/reorder", { items });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY })
  });
}
