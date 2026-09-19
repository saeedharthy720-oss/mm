import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { verifyAccessToken } from "../modules/auth/token.service.js";
import { effectivePermissions, permissionInclude } from "../modules/users/permissions.js";

export async function optionalAuthenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;
  if (!token) return next();

  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: permissionInclude
    });

    if (user?.isActive) {
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        roleKey: user.role.key,
        customerId: user.customerId,
        permissions: effectivePermissions(user)
      };
    }
  } catch {
    // Invalid or expired token — proceed unauthenticated rather than failing the request.
  }

  next();
}
