import type { Request, Response } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import * as productsService from "./products.service.js";
import {
  createProductSchema,
  listProductsQuerySchema,
  updateProductSchema
} from "./products.schemas.js";

export async function listProductsHandler(req: Request, res: Response) {
  const query = listProductsQuerySchema.parse(req.query);
  const canSeeInactive = Boolean(req.user?.permissions.includes(PERMISSION_KEYS.PRODUCTS_MANAGE));
  const includeInactive = canSeeInactive && query.includeInactive === "true";
  res.json(await productsService.listProducts(query, includeInactive));
}

export async function getProductHandler(req: Request, res: Response) {
  res.json({ product: await productsService.getProductById(req.params.id!) });
}

export async function createProductHandler(req: Request, res: Response) {
  const input = createProductSchema.parse(req.body);
  res.status(201).json({ product: await productsService.createProduct(input) });
}

export async function updateProductHandler(req: Request, res: Response) {
  const input = updateProductSchema.parse(req.body);
  res.json({ product: await productsService.updateProduct(req.params.id!, input) });
}

export async function deleteProductHandler(req: Request, res: Response) {
  await productsService.deleteProduct(req.params.id!);
  res.status(204).send();
}
