import { prisma } from "../../lib/prisma.js";

export async function listRoles() {
  const roles = await prisma.role.findMany({
    include: { rolePermissions: { include: { permission: true } } },
    orderBy: { key: "asc" }
  });

  return roles.map((role) => ({
    id: role.id,
    key: role.key,
    name: role.name,
    permissions: role.rolePermissions.map((rp) => rp.permission.key)
  }));
}
