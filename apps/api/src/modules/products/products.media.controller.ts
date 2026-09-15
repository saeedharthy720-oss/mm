import type { Request, Response } from "express";
import { BadRequestError } from "../../errors/AppError.js";
import { createStorageProvider } from "../../storage/index.js";
import * as productsService from "./products.service.js";

const storageProvider = createStorageProvider();

export async function uploadProductImageHandler(req: Request, res: Response) {
  if (!req.file) throw new BadRequestError("No file uploaded");

  const uploaded = await storageProvider.upload({
    fileName: req.file.originalname,
    contentType: req.file.mimetype,
    buffer: req.file.buffer
  });

  const image = await productsService.addProductImage(req.params.id!, uploaded.url);
  res.status(201).json({ image });
}

export async function deleteProductImageHandler(req: Request, res: Response) {
  await productsService.deleteProductImage(req.params.id!, req.params.imageId!);
  res.status(204).send();
}

export async function uploadProductVideoHandler(req: Request, res: Response) {
  if (!req.file) throw new BadRequestError("No file uploaded");

  const uploaded = await storageProvider.upload({
    fileName: req.file.originalname,
    contentType: req.file.mimetype,
    buffer: req.file.buffer
  });

  const product = await productsService.setProductVideo(req.params.id!, uploaded.url);
  res.status(201).json({ product });
}

export async function deleteProductVideoHandler(req: Request, res: Response) {
  const product = await productsService.setProductVideo(req.params.id!, null);
  res.json({ product });
}
