import type { Request, Response } from "express";
import * as usersService from "./users.service.js";
import { createUserSchema, updateUserSchema } from "./users.schemas.js";

export async function listUsersHandler(_req: Request, res: Response) {
  res.json({ users: await usersService.listUsers() });
}

export async function getUserHandler(req: Request, res: Response) {
  res.json({ user: await usersService.getUserById(req.params.id!) });
}

export async function createUserHandler(req: Request, res: Response) {
  const input = createUserSchema.parse(req.body);
  res.status(201).json({ user: await usersService.createUser(input) });
}

export async function updateUserHandler(req: Request, res: Response) {
  const input = updateUserSchema.parse(req.body);
  res.json({ user: await usersService.updateUser(req.params.id!, input) });
}
