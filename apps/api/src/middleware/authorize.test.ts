import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { ForbiddenError } from "../errors/AppError.js";
import { authorize } from "./authorize.js";

function run(permissionKey: string, user: unknown) {
  const req = { user } as unknown as Request;
  const next = vi.fn() as unknown as NextFunction;
  authorize(permissionKey)(req, {} as Response, next);
  return next as unknown as ReturnType<typeof vi.fn>;
}

describe("authorize", () => {
  it("lets a holder of the permission through", () => {
    const next = run("products:manage", { permissions: ["products:manage", "orders:view"] });

    expect(next).toHaveBeenCalledWith();
  });

  it("rejects a user without the permission", () => {
    const next = run("products:manage", { permissions: ["orders:view", "orders:manage"] });

    expect(next).toHaveBeenCalledOnce();
    expect(next.mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
  });

  it("rejects an unauthenticated request", () => {
    const next = run("products:manage", undefined);

    expect(next.mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
  });

  it("rejects a user with no permissions at all", () => {
    const next = run("orders:view", { permissions: [] });

    expect(next.mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
  });

  it("does not treat a permission as a prefix of another", () => {
    // "orders:view" must not satisfy "orders:viewAll" or vice versa.
    const next = run("orders:viewAll", { permissions: ["orders:view"] });

    expect(next.mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
  });

  // The seeded employee role. These are the boundaries that matter in practice:
  // an employee runs the order queue and must not reach the catalogue, staff
  // accounts or store settings.
  describe("the seeded employee role", () => {
    const employee = { permissions: ["orders:view", "orders:manage"] };

    it.each(["orders:view", "orders:manage"])("can %s", (permission) => {
      expect(run(permission, employee)).toHaveBeenCalledWith();
    });

    it.each(["products:manage", "categories:manage", "users:manage", "settings:manage"])(
      "cannot %s",
      (permission) => {
        expect(run(permission, employee).mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
      }
    );
  });

  // Customers share the users table with staff, so the role boundary is the
  // only thing keeping a shopper out of the dashboard.
  describe("the customer role", () => {
    const customer = { permissions: ["orders:view_own"], customerId: "cus_1" };

    it("can view its own orders", () => {
      expect(run("orders:view_own", customer)).toHaveBeenCalledWith();
    });

    it.each([
      "orders:view",
      "orders:manage",
      "products:manage",
      "categories:manage",
      "users:manage",
      "settings:manage"
    ])("cannot %s", (permission) => {
      expect(run(permission, customer).mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
    });

    it("cannot read the whole order list through the staff permission", () => {
      // orders:view_own must never be mistaken for orders:view, which returns
      // every customer's orders.
      expect(run("orders:view", customer).mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
    });
  });

  // Staff have no customerId, so "my orders" has nothing to scope to.
  describe("staff against the customer-only permission", () => {
    it.each([
      ["admin", ["products:manage", "categories:manage", "orders:manage", "orders:view", "users:manage", "settings:manage"]],
      ["employee", ["orders:view", "orders:manage"]]
    ])("%s cannot use orders:view_own", (_role, permissions) => {
      expect(run("orders:view_own", { permissions }).mock.calls[0]![0]).toBeInstanceOf(ForbiddenError);
    });
  });
});
