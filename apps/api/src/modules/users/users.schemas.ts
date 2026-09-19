import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  roleKey: z.enum(["admin", "employee"]),
  whatsappNumber: z.string().optional(),
  receivesOrderNotifications: z.boolean().optional()
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  roleKey: z.enum(["admin", "employee"]).optional(),
  // The complete set of directly-granted permissions, not a delta: sending it
  // replaces whatever was there, so removing one is just omitting it.
  extraPermissions: z.array(z.string()).optional(),
  // Empty string clears the number, which is why this is not .min(1).
  whatsappNumber: z.string().optional(),
  receivesOrderNotifications: z.boolean().optional()
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
