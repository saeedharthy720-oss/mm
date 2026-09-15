import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

interface RequestSchemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

export function validateRequest(schemas: RequestSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      next();
    } catch (err) {
      next(err);
    }
  };
}
