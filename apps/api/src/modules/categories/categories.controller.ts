import type { Request, Response } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import * as categoriesService from "./categories.service.js";
import {
  createCategorySchema,
  reorderCategoriesSchema,
  updateCategorySchema
} from "./categories.schemas.js";

export async function listCategoriesHandler(req: Request, res: Response) {
  const canSeeInactive = Boolean(req.user?.permissions.includes(PERMISSION_KEYS.CATEGORIES_MANAGE));
  const includeInactive = canSeeInactive && req.query.includeInactive === "true";
  res.json({ categories: await categoriesService.listCategories(includeInactive) });
}

export async function getCategoryHandler(req: Request, res: Response) {
  res.json({ category: await categoriesService.getCategoryById(req.params.id!) });
}

export async function createCategoryHandler(req: Request, res: Response) {
  const input = createCategorySchema.parse(req.body);
  res.status(201).json({ category: await categoriesService.createCategory(input) });
}

export async function updateCategoryHandler(req: Request, res: Response) {
  const input = updateCategorySchema.parse(req.body);
  res.json({ category: await categoriesService.updateCategory(req.params.id!, input) });
}

export async function deleteCategoryHandler(req: Request, res: Response) {
  await categoriesService.deleteCategory(req.params.id!);
  res.status(204).send();
}

export async function reorderCategoriesHandler(req: Request, res: Response) {
  const input = reorderCategoriesSchema.parse(req.body);
  await categoriesService.reorderCategories(input);
  res.status(204).send();
}
