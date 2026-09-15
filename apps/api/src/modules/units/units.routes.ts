import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";

export const unitsRouter = Router();

unitsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const units = await prisma.unit.findMany({ orderBy: { key: "asc" } });
    res.json({ units });
  })
);
