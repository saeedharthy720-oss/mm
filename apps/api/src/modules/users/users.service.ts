import bcrypt from "bcryptjs";
import { ConflictError, NotFoundError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import type { CreateUserInput, UpdateUserInput } from "./users.schemas.js";

function toPublicUser(user: {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  role: { key: string };
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    role: user.role.key,
    createdAt: user.createdAt
  };
}

export async function listUsers() {
  const users = await prisma.user.findMany({ include: { role: true }, orderBy: { createdAt: "asc" } });
  return users.map(toPublicUser);
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id }, include: { role: true } });
  if (!user) throw new NotFoundError("User not found");
  return toPublicUser(user);
}

export async function createUser(input: CreateUserInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new ConflictError("A user with this email already exists");

  const role = await prisma.role.findUniqueOrThrow({ where: { key: input.roleKey } });
  const passwordHash = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, passwordHash, roleId: role.id },
    include: { role: true }
  });

  return toPublicUser(user);
}

export async function updateUser(id: string, input: UpdateUserInput) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError("User not found");

  const roleId = input.roleKey
    ? (await prisma.role.findUniqueOrThrow({ where: { key: input.roleKey } })).id
    : undefined;

  const user = await prisma.user.update({
    where: { id },
    data: { name: input.name, isActive: input.isActive, roleId },
    include: { role: true }
  });

  return toPublicUser(user);
}
