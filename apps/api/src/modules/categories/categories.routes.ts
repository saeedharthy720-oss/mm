import { Router } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { optionalAuthenticate } from "../../middleware/optionalAuthenticate.js";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoryHandler,
  listCategoriesHandler,
  reorderCategoriesHandler,
  updateCategoryHandler
} from "./categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", optionalAuthenticate, asyncHandler(listCategoriesHandler));
categoriesRouter.get("/:id", asyncHandler(getCategoryHandler));

categoriesRouter.use(authenticate, authorize(PERMISSION_KEYS.CATEGORIES_MANAGE));
categoriesRouter.post("/", asyncHandler(createCategoryHandler));
categoriesRouter.patch("/reorder", asyncHandler(reorderCategoriesHandler));
categoriesRouter.patch("/:id", asyncHandler(updateCategoryHandler));
categoriesRouter.delete("/:id", asyncHandler(deleteCategoryHandler));
