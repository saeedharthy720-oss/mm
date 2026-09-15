import type { Request, Response } from "express";
import * as rolesService from "./roles.service.js";

export async function listRolesHandler(_req: Request, res: Response) {
  res.json({ roles: await rolesService.listRoles() });
}
