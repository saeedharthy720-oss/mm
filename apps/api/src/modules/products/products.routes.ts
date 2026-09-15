import { Router } from "express";
import multer from "multer";
import { PERMISSION_KEYS } from "../../config/constants.js";
import { BadRequestError } from "../../errors/AppError.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { optionalAuthenticate } from "../../middleware/optionalAuthenticate.js";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  listProductsHandler,
  updateProductHandler
} from "./products.controller.js";
import {
  deleteProductImageHandler,
  deleteProductVideoHandler,
  uploadProductImageHandler,
  uploadProductVideoHandler
} from "./products.media.controller.js";

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new BadRequestError("Only image files are allowed"));
    }
    cb(null, true);
  }
});

const uploadVideo = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new BadRequestError("Only video files are allowed"));
    }
    cb(null, true);
  }
});

export const productsRouter = Router();

productsRouter.get("/", optionalAuthenticate, asyncHandler(listProductsHandler));
productsRouter.get("/:id", asyncHandler(getProductHandler));

productsRouter.use(authenticate, authorize(PERMISSION_KEYS.PRODUCTS_MANAGE));
productsRouter.post("/", asyncHandler(createProductHandler));
productsRouter.patch("/:id", asyncHandler(updateProductHandler));
productsRouter.delete("/:id", asyncHandler(deleteProductHandler));

productsRouter.post("/:id/images", uploadImage.single("file"), asyncHandler(uploadProductImageHandler));
productsRouter.delete("/:id/images/:imageId", asyncHandler(deleteProductImageHandler));

productsRouter.post("/:id/video", uploadVideo.single("file"), asyncHandler(uploadProductVideoHandler));
productsRouter.delete("/:id/video", asyncHandler(deleteProductVideoHandler));
