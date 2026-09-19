import bcrypt from "bcryptjs";
import { ConflictError, NotFoundError, ValidationError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import {
  directPermissions,
  effectivePermissions,
  permissionInclude,
  rolePermissions
} from "./permissions.js";
import type { CreateUserInput, UpdateUserInput } from "./users.schemas.js";

type UserWithPermissions = Parameters<typeof effectivePermissions>[0];

function toPublicUser(user: UserWithPermissions & { id: string; name: string; email: string; isActive: boolean; createdAt: Date }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    role: user.role.key,
    createdAt: user.createdAt,
    // Split so the UI can show which permissions come with the role (fixed)
    // and which were granted to this person (editable).
    permissions: effectivePermissions(user),
    rolePermissions: rolePermissions(user),
    extraPermissions: directPermissions(user)
  };
}

export async function listUsers() {
  // Staff only. Customers share this table but register themselves and are not
  // administered here; listing them would bury the handful of staff accounts
  // in a list that grows with every shopper.
  const users = await prisma.user.findMany({
    where: { customerId: null },
    include: permissionInclude,
    orderBy: { createdAt: "asc" }
  });
  return users.map(toPublicUser);
}

export async function listAssignablePermissions() {
  // The customer-only permission is meaningless on a staff account, which has
  // no customer record for "own orders" to refer to.
  const permissions = await prisma.permission.findMany({
    where: { key: { not: "orders:view_own" } },
    orderBy: { key: "asc" }
  });
  return permissions.map((permission) => ({ key: permission.key, description: permission.description }));
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id }, include: permissionInclude });
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
    include: permissionInclude
  });

  return toPublicUser(user);
}

/** Replaces a user's direct grants with exactly the keys given. */
async function setExtraPermissions(userId: string, keys: string[]) {
  const permissions = await prisma.permission.findMany({ where: { key: { in: keys } } });

  const found = new Set(permissions.map((permission) => permission.key));
  const unknown = keys.filter((key) => !found.has(key));
  if (unknown.length > 0) {
    throw new ValidationError(`Unknown permission(s): ${unknown.join(", ")}`);
  }

  await prisma.$transaction([
    prisma.userPermission.deleteMany({ where: { userId } }),
    prisma.userPermission.createMany({
      data: permissions.map((permission) => ({ userId, permissionId: permission.id }))
    })
  ]);
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

  if (input.extraPermissions) {
    await setExtraPermissions(id, input.extraPermissions);
  }

  const user = await prisma.user.update({
    where: { id },
    data: { name: input.name, isActive: input.isActive, roleId },
    include: permissionInclude
  });

  return toPublicUser(user);
}
