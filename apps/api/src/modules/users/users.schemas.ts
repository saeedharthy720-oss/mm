import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  roleKey: z.enum(["admin", "employee"])
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  roleKey: z.enum(["admin", "employee"]).optional()
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
