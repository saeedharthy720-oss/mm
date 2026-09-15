export const ROLE_KEYS = {
  ADMIN: "admin",
  EMPLOYEE: "employee"
} as const;

export const PERMISSION_KEYS = {
  PRODUCTS_MANAGE: "products:manage",
  CATEGORIES_MANAGE: "categories:manage",
  ORDERS_MANAGE: "orders:manage",
  ORDERS_VIEW: "orders:view",
  USERS_MANAGE: "users:manage",
  SETTINGS_MANAGE: "settings:manage"
} as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[keyof typeof PERMISSION_KEYS];
