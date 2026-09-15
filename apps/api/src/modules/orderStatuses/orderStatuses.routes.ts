import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";

export const orderStatusesRouter = Router();

orderStatusesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const statuses = await prisma.orderStatus.findMany({ orderBy: { sortOrder: "asc" } });
    res.json({ statuses });
  })
);
