import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  // Long enough to be worth having, short enough not to drive people to reuse
  // a weak one. No composition rules: they push people towards "Password1!".
  password: z.string().min(8, "Password must be at least 8 characters")
});

export type RegisterInput = z.infer<typeof registerSchema>;
