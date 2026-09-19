import { Router } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import {
  createUserHandler,
  getUserHandler,
  listNotificationRecipientsHandler,
  listPermissionsHandler,
  listUsersHandler,
  updateUserHandler
} from "./users.controller.js";

export const usersRouter = Router();

usersRouter.use(authenticate);

// Anyone working the order queue needs to know who to forward an order to, so
// this is gated on orders:view rather than users:manage. It returns names and
// WhatsApp numbers only — no emails, roles or account state.
usersRouter.get(
  "/notification-recipients",
  authorize(PERMISSION_KEYS.ORDERS_VIEW),
  asyncHandler(listNotificationRecipientsHandler)
);

// Everything below administers staff accounts.
usersRouter.get("/", authorize(PERMISSION_KEYS.USERS_MANAGE), asyncHandler(listUsersHandler));
// Before "/:id", or Express reads "permissions" as a user id.
usersRouter.get(
  "/permissions",
  authorize(PERMISSION_KEYS.USERS_MANAGE),
  asyncHandler(listPermissionsHandler)
);
usersRouter.get("/:id", authorize(PERMISSION_KEYS.USERS_MANAGE), asyncHandler(getUserHandler));
usersRouter.post("/", authorize(PERMISSION_KEYS.USERS_MANAGE), asyncHandler(createUserHandler));
usersRouter.patch("/:id", authorize(PERMISSION_KEYS.USERS_MANAGE), asyncHandler(updateUserHandler));
