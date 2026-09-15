import { Router } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { listRolesHandler } from "./roles.controller.js";

export const rolesRouter = Router();

rolesRouter.get("/", authenticate, authorize(PERMISSION_KEYS.USERS_MANAGE), asyncHandler(listRolesHandler));
