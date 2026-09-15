import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface ProductImage {
  id: string;
  url: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  sku: string;
  categoryId: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string | null;
  descriptionAr: string | null;
  price: string;
  unitId: string;
  customUnitLabel: string | null;
  quantityAvailable: number;
  manualStockOverride: boolean;
  deliveryCharge: string;
  isActive: boolean;
  allowCardPayment: boolean;
  allowPayOnDelivery: boolean;
  videoUrl: string | null;
  isOutOfStock: boolean;
  images: ProductImage[];
  category: { id: string; nameEn: string };
  unit: { id: string; key: string; labelEn: string };
}

export interface ProductListResult {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
}

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  includeInactive?: boolean;
  page?: number;
}

const PRODUCTS_KEY = ["products"];

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, filters],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductListResult>("/api/v1/products", {
        params: {
          categoryId: filters.categoryId || undefined,
          search: filters.search || undefined,
          includeInactive: filters.includeInactive ? "true" : undefined,
          page: filters.page ?? 1,
          pageSize: 20
        }
      });
      return data;
    }
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ product: Product }>(`/api/v1/products/${id}`);
      return data.product;
    },
    enabled: Boolean(id)
  });
}

function invalidateProducts(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: Record<string, unknown>) => {
      const { data } = await apiClient.post<{ product: Product }>("/api/v1/products", input);
      return data.product;
    },
    onSuccess: () => invalidateProducts(queryClient)
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: Record<string, unknown> & { id: string }) => {
      const { data } = await apiClient.patch<{ product: Product }>(`/api/v1/products/${id}`, input);
      return data.product;
    },
    onSuccess: () => invalidateProducts(queryClient)
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/v1/products/${id}`);
    },
    onSuccess: () => invalidateProducts(queryClient)
  });
}

export function useUploadProductImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, file }: { productId: string; file: File }) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await apiClient.post(`/api/v1/products/${productId}/images`, formData);
      return data;
    },
    onSuccess: () => invalidateProducts(queryClient)
  });
}

export function useDeleteProductImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, imageId }: { productId: string; imageId: string }) => {
      await apiClient.delete(`/api/v1/products/${productId}/images/${imageId}`);
    },
    onSuccess: () => invalidateProducts(queryClient)
  });
}

export function useUploadProductVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, file }: { productId: string; file: File }) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await apiClient.post(`/api/v1/products/${productId}/video`, formData);
      return data;
    },
    onSuccess: () => invalidateProducts(queryClient)
  });
}

export function useDeleteProductVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      await apiClient.delete(`/api/v1/products/${productId}/video`);
    },
    onSuccess: () => invalidateProducts(queryClient)
  });
}
