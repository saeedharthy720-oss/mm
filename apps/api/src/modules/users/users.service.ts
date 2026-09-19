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
  // Staff only. Customers share this table but register themselves and are not
  // administered here; listing them would bury the handful of staff accounts
  // in a list that grows with every shopper.
  const users = await prisma.user.findMany({
    where: { customerId: null },
    include: { role: true },
    orderBy: { createdAt: "asc" }
  });
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

  // Staff accounts never carry a customer profile. Promoting a shopper into
  // staff here would produce an account that is both, which nothing else in
  // the system expects.
  if (existing.customerId) {
    throw new ConflictError("This is a customer account and cannot be managed as staff");
  }

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
