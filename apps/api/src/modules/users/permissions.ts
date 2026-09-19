import type { Prisma } from "@prisma/client";

/**
 * Everything needed to work out what a user may do. Used as a Prisma `include`
 * so every path that loads a user for authorisation asks for the same shape —
 * a route that forgot the direct grants would quietly under-permit, and one
 * that forgot the role's would quietly over-permit.
 */
export const permissionInclude = {
  role: { include: { rolePermissions: { include: { permission: true } } } },
  extraPermissions: { include: { permission: true } }
} satisfies Prisma.UserInclude;

type UserWithPermissions = Prisma.UserGetPayload<{ include: typeof permissionInclude }>;

/**
 * A user's effective permissions: their role's, plus any granted to them
 * directly. The union, never a subtraction — a direct grant can only add, so a
 * role's permissions are always the floor.
 */
export function effectivePermissions(user: UserWithPermissions): string[] {
  const keys = new Set<string>();

  for (const rolePermission of user.role.rolePermissions) {
    keys.add(rolePermission.permission.key);
  }
  for (const extra of user.extraPermissions) {
    keys.add(extra.permission.key);
  }

  return [...keys].sort();
}

/** The subset granted directly, which is what the staff UI edits. */
export function directPermissions(user: UserWithPermissions): string[] {
  return user.extraPermissions.map((extra) => extra.permission.key).sort();
}

/** The role's own grants — shown as fixed, non-editable, in the staff UI. */
export function rolePermissions(user: UserWithPermissions): string[] {
  return user.role.rolePermissions.map((rp) => rp.permission.key).sort();
}
