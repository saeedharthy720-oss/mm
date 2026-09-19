import { Router } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { checkoutRateLimiter } from "../../middleware/rateLimit.js";
import {
  checkoutHandler,
  getOrderHandler,
  listOrdersHandler,
  listOwnOrdersHandler,
  updateOrderStatusHandler
} from "./orders.controller.js";

export const ordersRouter = Router();

ordersRouter.post("/", checkoutRateLimiter, asyncHandler(checkoutHandler));
ordersRouter.get("/", authenticate, authorize(PERMISSION_KEYS.ORDERS_VIEW), asyncHandler(listOrdersHandler));
// Must be declared before "/:id", or Express matches it as an order id.
ordersRouter.get(
  "/mine",
  authenticate,
  authorize(PERMISSION_KEYS.ORDERS_VIEW_OWN),
  asyncHandler(listOwnOrdersHandler)
);
ordersRouter.get("/:id", asyncHandler(getOrderHandler));
ordersRouter.patch(
  "/:id/status",
  authenticate,
  authorize(PERMISSION_KEYS.ORDERS_MANAGE),
  asyncHandler(updateOrderStatusHandler)
);
