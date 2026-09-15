import type { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/AppError.js";

export function authorize(permissionKey: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user?.permissions.includes(permissionKey)) {
      return next(new ForbiddenError(`Missing permission: ${permissionKey}`));
    }
    next();
  };
}
