import { describe, expect, it } from "vitest";
import { directPermissions, effectivePermissions, rolePermissions } from "./permissions.js";

type User = Parameters<typeof effectivePermissions>[0];

function user(roleKeys: string[], extraKeys: string[] = []): User {
  return {
    role: {
      key: "employee",
      rolePermissions: roleKeys.map((key) => ({ permission: { key } }))
    },
    extraPermissions: extraKeys.map((key) => ({ permission: { key } }))
  } as unknown as User;
}

describe("effectivePermissions", () => {
  it("is the role's permissions when nothing extra is granted", () => {
    expect(effectivePermissions(user(["orders:view", "orders:manage"]))).toEqual([
      "orders:manage",
      "orders:view"
    ]);
  });

  it("adds permissions granted directly to the person", () => {
    // The point of the feature: one employee also handles the catalogue,
    // without inventing a role for a single person.
    const permissions = effectivePermissions(user(["orders:view", "orders:manage"], ["products:manage"]));

    expect(permissions).toContain("products:manage");
    expect(permissions).toContain("orders:view");
  });

  it("does not duplicate a permission the role already grants", () => {
    const permissions = effectivePermissions(user(["orders:view"], ["orders:view"]));

    expect(permissions).toEqual(["orders:view"]);
  });

  it("cannot remove a permission the role grants", () => {
    // Direct grants are additive only. An empty extra list must never strip
    // what the role provides, or disabling a checkbox could lock an admin out.
    expect(effectivePermissions(user(["orders:view", "orders:manage"], []))).toEqual([
      "orders:manage",
      "orders:view"
    ]);
  });

  it("returns nothing when neither source grants anything", () => {
    expect(effectivePermissions(user([], []))).toEqual([]);
  });

  it("keeps a stable order regardless of input order", () => {
    const a = effectivePermissions(user(["orders:view", "products:manage"]));
    const b = effectivePermissions(user(["products:manage", "orders:view"]));

    expect(a).toEqual(b);
  });
});

describe("splitting the two sources", () => {
  const staffMember = user(["orders:view", "orders:manage"], ["products:manage"]);

  it("reports the role's own grants", () => {
    expect(rolePermissions(staffMember)).toEqual(["orders:manage", "orders:view"]);
  });

  it("reports only what was granted directly", () => {
    // The staff UI edits this set, and must not offer to revoke a permission
    // that comes from the role — the checkbox would appear to do nothing.
    expect(directPermissions(staffMember)).toEqual(["products:manage"]);
  });
});
