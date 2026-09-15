import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/AppError.js";
import { prisma } from "../lib/prisma.js";
import { verifyAccessToken } from "../modules/auth/token.service.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        roleKey: string;
        permissions: string[];
      };
    }
  }
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.access_token;
    if (!token) throw new UnauthorizedError("Not authenticated");

    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: { include: { rolePermissions: { include: { permission: true } } } } }
    });

    if (!user || !user.isActive) throw new UnauthorizedError("Not authenticated");

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      roleKey: user.role.key,
      permissions: user.role.rolePermissions.map((rp) => rp.permission.key)
    };

    next();
  } catch (err) {
    next(err instanceof UnauthorizedError ? err : new UnauthorizedError("Not authenticated"));
  }
}
