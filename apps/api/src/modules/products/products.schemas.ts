import { z } from "zod";

export const createProductSchema = z.object({
  sku: z.string().min(1),
  categoryId: z.string().uuid(),
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  price: z.coerce.number().nonnegative(),
  unitId: z.string().uuid(),
  customUnitLabel: z.string().optional(),
  quantityAvailable: z.coerce.number().int().nonnegative().default(0),
  manualStockOverride: z.boolean().default(false),
  deliveryCharge: z.coerce.number().nonnegative().default(0),
  isActive: z.boolean().default(true),
  allowCardPayment: z.boolean().default(true),
  allowPayOnDelivery: z.boolean().default(true),
  attributes: z.record(z.unknown()).default({})
});

export const updateProductSchema = createProductSchema.partial();

export const listProductsQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  includeInactive: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20)
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;
