import { z } from "zod";

export const createCategorySchema = z.object({
  nameEn: z.string().min(1),
  nameAr: z.string().min(1),
  slug: z.string().min(1).optional(),
  parentId: z.string().uuid().nullable().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional()
});

export const updateCategorySchema = createCategorySchema.partial();

export const reorderCategoriesSchema = z.object({
  items: z.array(z.object({ id: z.string().uuid(), sortOrder: z.number().int() })).min(1)
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type ReorderCategoriesInput = z.infer<typeof reorderCategoriesSchema>;
