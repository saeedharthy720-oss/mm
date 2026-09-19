import type { Request, Response } from "express";
import { corsAllowedOrigins } from "../../config/env.js";
import { ForbiddenError } from "../../errors/AppError.js";
import { checkoutSchema, listOrdersQuerySchema, updateOrderStatusSchema } from "./orders.schemas.js";
import * as ordersService from "./orders.service.js";

export async function checkoutHandler(req: Request, res: Response) {
  const input = checkoutSchema.parse(req.body);
  const requestOrigin = req.get("origin") ?? "";
  const origin = corsAllowedOrigins.includes(requestOrigin) ? requestOrigin : corsAllowedOrigins[0]!;
  const result = await ordersService.checkout(input, origin);
  res.status(201).json(result);
}

export async function getOrderHandler(req: Request, res: Response) {
  res.json({ order: await ordersService.getOrderById(req.params.id!) });
}

export async function listOwnOrdersHandler(req: Request, res: Response) {
  const query = listOrdersQuerySchema.parse(req.query);
  // The permission is granted only to the customer role, whose accounts always
  // carry a customerId; a staff account reaching here would have none.
  const customerId = req.user?.customerId;
  if (!customerId) {
    throw new ForbiddenError("This account has no customer profile");
  }
  res.json(await ordersService.listOwnOrders(customerId, query));
}

export async function listOrdersHandler(req: Request, res: Response) {
  const query = listOrdersQuerySchema.parse(req.query);
  res.json(await ordersService.listOrders(query));
}

export async function updateOrderStatusHandler(req: Request, res: Response) {
  const input = updateOrderStatusSchema.parse(req.body);
  const order = await ordersService.updateOrderStatus(req.params.id!, input, req.user!.id);
  res.json({ order });
}
