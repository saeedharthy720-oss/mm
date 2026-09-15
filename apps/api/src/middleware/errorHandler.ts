import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError, ValidationError } from "../errors/AppError.js";
import { logger } from "../lib/logger.js";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    const validationError = new ValidationError("Validation failed", err.flatten());
    return res.status(validationError.statusCode).json({
      error: {
        code: validationError.code,
        message: validationError.message,
        details: validationError.details
      }
    });
  }

  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error({ err }, err.message);
    }
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err instanceof ValidationError && err.details ? { details: err.details } : {})
      }
    });
  }

  logger.error({ err }, "Unhandled error");
  return res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Something went wrong" } });
}
