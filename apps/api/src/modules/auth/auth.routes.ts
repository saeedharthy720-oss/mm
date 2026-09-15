import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { loginRateLimiter } from "../../middleware/rateLimit.js";
import { loginHandler, logoutHandler, meHandler, refreshHandler } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", loginRateLimiter, asyncHandler(loginHandler));
authRouter.post("/refresh", asyncHandler(refreshHandler));
authRouter.post("/logout", asyncHandler(logoutHandler));
authRouter.get("/me", authenticate, asyncHandler(meHandler));
