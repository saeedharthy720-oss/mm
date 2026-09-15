import { useQuery } from "@tanstack/react-query";
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
  deliveryCharge: string;
  isActive: boolean;
  allowCardPayment: boolean;
  allowPayOnDelivery: boolean;
  videoUrl: string | null;
  isOutOfStock: boolean;
  images: ProductImage[];
  category: { id: string; nameEn: string; nameAr: string; slug: string };
  unit: { id: string; key: string; labelEn: string; labelAr: string; isCustom: boolean };
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
  page?: number;
}

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductListResult>("/api/v1/products", {
        params: {
          categoryId: filters.categoryId || undefined,
          search: filters.search || undefined,
          page: filters.page ?? 1,
          pageSize: 12
        }
      });
      return data;
    }
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data } = await apiClient.get<{ product: Product }>(`/api/v1/products/${id}`);
      return data.product;
    },
    enabled: Boolean(id)
  });
}
