export type RoleKey = "admin" | "employee";

export type PermissionKey =
  | "products:manage"
  | "categories:manage"
  | "orders:manage"
  | "orders:view"
  | "users:manage"
  | "settings:manage";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: RoleKey;
  permissions: PermissionKey[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
}
