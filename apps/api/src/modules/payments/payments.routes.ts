import express, { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { thawaniWebhookHandler } from "./payments.controller.js";

export const paymentsRouter = Router();

paymentsRouter.post("/thawani/webhook", express.raw({ type: "*/*" }), asyncHandler(thawaniWebhookHandler));
