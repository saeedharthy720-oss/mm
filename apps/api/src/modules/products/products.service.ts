import type { Prisma } from "@prisma/client";
import { ConflictError, NotFoundError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateProductInput, ListProductsQuery, UpdateProductInput } from "./products.schemas.js";

function withComputedStock<T extends { quantityAvailable: number; manualStockOverride: boolean }>(
  product: T
) {
  return {
    ...product,
    isOutOfStock: product.manualStockOverride ? false : product.quantityAvailable <= 0
  };
}

export async function listProducts(query: ListProductsQuery, includeInactive: boolean) {
  const where = {
    ...(includeInactive ? {} : { isActive: true }),
    ...(query.categoryId ? { categoryId: query.categoryId } : {}),
    ...(query.search
      ? {
          OR: [
            { nameEn: { contains: query.search, mode: "insensitive" as const } },
            { nameAr: { contains: query.search, mode: "insensitive" as const } },
            { sku: { contains: query.search, mode: "insensitive" as const } }
          ]
        }
      : {})
  };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, unit: true, images: { orderBy: { sortOrder: "asc" } } },
      orderBy: { createdAt: "desc" },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize
    }),
    prisma.product.count({ where })
  ]);

  return {
    items: items.map(withComputedStock),
    page: query.page,
    pageSize: query.pageSize,
    total
  };
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, unit: true, images: { orderBy: { sortOrder: "asc" } } }
  });
  if (!product) throw new NotFoundError("Product not found");
  return withComputedStock(product);
}

export async function createProduct(input: CreateProductInput) {
  const existingSku = await prisma.product.findUnique({ where: { sku: input.sku } });
  if (existingSku) throw new ConflictError("A product with this SKU already exists");

  const product = await prisma.product.create({
    data: input as Prisma.ProductUncheckedCreateInput,
    include: { category: true, unit: true, images: true }
  });

  return withComputedStock(product);
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  await getProductById(id);

  if (input.sku) {
    const existingSku = await prisma.product.findFirst({ where: { sku: input.sku, id: { not: id } } });
    if (existingSku) throw new ConflictError("A product with this SKU already exists");
  }

  const product = await prisma.product.update({
    where: { id },
    data: input as Prisma.ProductUncheckedUpdateInput,
    include: { category: true, unit: true, images: { orderBy: { sortOrder: "asc" } } }
  });

  return withComputedStock(product);
}

export async function deleteProduct(id: string) {
  await getProductById(id);
  await prisma.product.delete({ where: { id } });
}

export async function addProductImage(productId: string, url: string) {
  await getProductById(productId);

  const maxSortOrder = await prisma.productImage.aggregate({
    where: { productId },
    _max: { sortOrder: true }
  });

  return prisma.productImage.create({
    data: { productId, url, sortOrder: (maxSortOrder._max.sortOrder ?? -1) + 1 }
  });
}

export async function deleteProductImage(productId: string, imageId: string) {
  const image = await prisma.productImage.findFirst({ where: { id: imageId, productId } });
  if (!image) throw new NotFoundError("Image not found");
  await prisma.productImage.delete({ where: { id: imageId } });
  return image;
}

export async function setProductVideo(productId: string, videoUrl: string | null) {
  await getProductById(productId);
  return prisma.product.update({ where: { id: productId }, data: { videoUrl } });
}
