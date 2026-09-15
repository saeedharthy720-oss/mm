import { Router } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import {
  createUserHandler,
  getUserHandler,
  listUsersHandler,
  updateUserHandler
} from "./users.controller.js";

export const usersRouter = Router();

usersRouter.use(authenticate, authorize(PERMISSION_KEYS.USERS_MANAGE));

usersRouter.get("/", asyncHandler(listUsersHandler));
usersRouter.get("/:id", asyncHandler(getUserHandler));
usersRouter.post("/", asyncHandler(createUserHandler));
usersRouter.patch("/:id", asyncHandler(updateUserHandler));
