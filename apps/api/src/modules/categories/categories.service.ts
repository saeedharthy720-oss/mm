import { ConflictError, NotFoundError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { slugify } from "../../lib/slugify.js";
import type {
  CreateCategoryInput,
  ReorderCategoriesInput,
  UpdateCategoryInput
} from "./categories.schemas.js";

export async function listCategories(includeInactive: boolean) {
  return prisma.category.findMany({
    where: includeInactive ? undefined : { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { nameEn: "asc" }]
  });
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new NotFoundError("Category not found");
  return category;
}

async function ensureUniqueSlug(candidate: string, excludeId?: string): Promise<string> {
  let slug = candidate;
  let suffix = 1;

  while (
    await prisma.category.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) }
    })
  ) {
    suffix += 1;
    slug = `${candidate}-${suffix}`;
  }

  return slug;
}

export async function createCategory(input: CreateCategoryInput) {
  if (input.parentId) {
    await getCategoryById(input.parentId);
  }

  const slug = await ensureUniqueSlug(slugify(input.slug || input.nameEn));

  return prisma.category.create({
    data: {
      nameEn: input.nameEn,
      nameAr: input.nameAr,
      slug,
      parentId: input.parentId ?? null,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true
    }
  });
}

export async function updateCategory(id: string, input: UpdateCategoryInput) {
  await getCategoryById(id);

  if (input.parentId === id) {
    throw new ConflictError("A category cannot be its own parent");
  }
  if (input.parentId) {
    await getCategoryById(input.parentId);
  }

  const data: Record<string, unknown> = { ...input };
  if (input.slug || input.nameEn) {
    data.slug = await ensureUniqueSlug(slugify(input.slug || input.nameEn!), id);
  }

  return prisma.category.update({ where: { id }, data });
}

export async function deleteCategory(id: string) {
  await getCategoryById(id);

  const childCount = await prisma.category.count({ where: { parentId: id } });
  if (childCount > 0) throw new ConflictError("Delete or reassign subcategories first");

  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) throw new ConflictError("Reassign products before deleting this category");

  await prisma.category.delete({ where: { id } });
}

export async function reorderCategories(input: ReorderCategoriesInput) {
  await prisma.$transaction(
    input.items.map((item) =>
      prisma.category.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } })
    )
  );
}
