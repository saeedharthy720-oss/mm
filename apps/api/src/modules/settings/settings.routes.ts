import { Router } from "express";
import { PERMISSION_KEYS } from "../../config/constants.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { getPublicSettingsHandler, listSettingsHandler, updateSettingHandler } from "./settings.controller.js";

export const settingsRouter = Router();

settingsRouter.get("/public", asyncHandler(getPublicSettingsHandler));

settingsRouter.use(authenticate, authorize(PERMISSION_KEYS.SETTINGS_MANAGE));
settingsRouter.get("/", asyncHandler(listSettingsHandler));
settingsRouter.patch("/:key", asyncHandler(updateSettingHandler));
