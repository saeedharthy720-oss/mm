import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import * as authService from "./auth.service.js";
import { loginSchema } from "./auth.schemas.js";

const isProduction = env.NODE_ENV === "production";

// In production the frontends (e.g. *.netlify.app) and this API (e.g. *.onrender.com)
// are different sites, so the auth cookies must be SameSite=None to be sent at all —
// which browsers only accept together with Secure. Locally everything is on
// localhost, where Lax works and Secure would break plain http.
const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  domain: env.COOKIE_DOMAIN === "localhost" ? undefined : env.COOKIE_DOMAIN,
  maxAge: 15 * 60 * 1000
};

const refreshCookieOptions = {
  ...accessCookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth"
};

function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie("access_token", accessToken, accessCookieOptions);
  res.cookie("refresh_token", refreshToken, refreshCookieOptions);
}

function clearAuthCookies(res: Response) {
  res.clearCookie("access_token", accessCookieOptions);
  res.clearCookie("refresh_token", refreshCookieOptions);
}

export async function loginHandler(req: Request, res: Response) {
  const input = loginSchema.parse(req.body);
  const { accessToken, refreshToken, user } = await authService.login(input);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ user });
}

export async function refreshHandler(req: Request, res: Response) {
  const { accessToken, refreshToken, user } = await authService.refresh(req.cookies?.refresh_token);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ user });
}

export async function logoutHandler(req: Request, res: Response) {
  await authService.logout(req.cookies?.refresh_token);
  clearAuthCookies(res);
  res.status(204).send();
}

export async function meHandler(req: Request, res: Response) {
  const user = await authService.getCurrentUser(req.user!.id);
  res.json({ user });
}
