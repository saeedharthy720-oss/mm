import crypto from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";

export interface AccessTokenPayload {
  sub: string;
}

// Zod types these as plain `string` (e.g. "15m"); jsonwebtoken's own types want its
// narrower `StringValue` template-literal type. The env values are validated at boot,
// so this cast just bridges that gap rather than reflecting a real runtime risk.
const accessTokenExpiresIn = env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"];
const refreshTokenExpiresIn = env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"];

export function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, { expiresIn: accessTokenExpiresIn });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, { expiresIn: refreshTokenExpiresIn });
}

export function verifyRefreshToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as AccessTokenPayload;
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getTokenExpiryDate(token: string): Date {
  const decoded = jwt.decode(token) as { exp: number };
  return new Date(decoded.exp * 1000);
}
