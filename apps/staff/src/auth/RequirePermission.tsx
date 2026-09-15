import type { PermissionKey } from "@bms/shared-types";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "./useAuth.js";

export function RequirePermission({
  permission,
  children
}: {
  permission: PermissionKey;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();

  if (!user?.permissions.includes(permission)) {
    return <p className="p-4 text-slate-500">{t("common.notAuthorized")}</p>;
  }

  return <>{children}</>;
}
