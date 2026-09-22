export type RoleKey = "admin" | "employee" | "customer";

export type PermissionKey =
  | "products:manage"
  | "categories:manage"
  | "orders:manage"
  | "orders:view"
  | "orders:delete"
  | "users:manage"
  | "settings:manage"
  | "orders:view_own";

/**
 * Staff permissions. Holding any of these means the account belongs in the
 * dashboard; holding none means it is a customer.
 *
 * Membership is decided by permission rather than by role key so that adding a
 * role later — manager, warehouse, accountant — needs no change here.
 */
export const STAFF_PERMISSIONS: readonly PermissionKey[] = [
  "products:manage",
  "categories:manage",
  "orders:manage",
  "orders:view",
  "orders:delete",
  "users:manage",
  "settings:manage"
];

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: RoleKey;
  /** Set only for customer accounts; staff accounts have none. */
  customerId: string | null;
  permissions: PermissionKey[];
}

export function isStaff(user: Pick<AuthUser, "permissions"> | null | undefined): boolean {
  return Boolean(user?.permissions.some((permission) => STAFF_PERMISSIONS.includes(permission)));
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
}
