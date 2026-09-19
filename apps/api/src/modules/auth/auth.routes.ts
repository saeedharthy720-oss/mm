import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { loginRateLimiter } from "../../middleware/rateLimit.js";
import {
  loginHandler,
  logoutHandler,
  meHandler,
  refreshHandler,
  registerHandler
} from "./auth.controller.js";

export const authRouter = Router();

// Rate limited like login: registration also creates sessions and hashes
// passwords, so it is just as attractive to hammer.
authRouter.post("/register", loginRateLimiter, asyncHandler(registerHandler));
authRouter.post("/login", loginRateLimiter, asyncHandler(loginHandler));
authRouter.post("/refresh", asyncHandler(refreshHandler));
authRouter.post("/logout", asyncHandler(logoutHandler));
authRouter.get("/me", authenticate, asyncHandler(meHandler));
