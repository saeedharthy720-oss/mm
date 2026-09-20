import { useLanguage } from "@bms/shared-i18n";
import { Globe, LogOut, Store } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import { useCurrentUser, useLogout } from "../auth/useAuth.js";

function navItemClass({ isActive }: { isActive: boolean }) {
  return `shrink-0 whitespace-nowrap rounded px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-secondary text-secondary-foreground"
      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
  }`;
}

export function StaffLayout() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            {/* The mark carries its own dark ground, so no plate behind it. */}
            <img src="/admin/logo.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-full" />
            <span className="hidden shrink-0 rounded bg-primary-foreground/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:inline">
              {t("nav.staffBadge")}
            </span>

            <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {user?.permissions.includes("orders:view") && (
                <NavLink to="/orders" className={navItemClass}>
                  {t("nav.orders")}
                </NavLink>
              )}
              {user?.permissions.includes("products:manage") && (
                <NavLink to="/products" className={navItemClass}>
                  {t("nav.products")}
                </NavLink>
              )}
              {user?.permissions.includes("categories:manage") && (
                <NavLink to="/categories" className={navItemClass}>
                  {t("nav.categories")}
                </NavLink>
              )}
              {user?.permissions.includes("users:manage") && (
                <NavLink to="/staff" className={navItemClass}>
                  {t("nav.staff")}
                </NavLink>
              )}
              {user?.permissions.includes("settings:manage") && (
                <NavLink to="/settings" className={navItemClass}>
                  {t("nav.settings")}
                </NavLink>
              )}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-sm">
            <span className="hidden text-primary-foreground/80 sm:inline">
              {user?.name} · {user?.role}
            </span>

            <a
              href="/"
              title={t("nav.backToStore")}
              className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-primary-foreground/10"
            >
              <Store className="h-4 w-4" />
              <span className="sr-only">{t("nav.backToStore")}</span>
            </a>

            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              title={language === "en" ? "العربية" : "English"}
              className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-primary-foreground/10"
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">{language === "en" ? "العربية" : "English"}</span>
            </button>

            <button
              type="button"
              onClick={() => logout.mutate()}
              title={t("nav.logout")}
              className="flex h-9 w-9 items-center justify-center rounded transition-colors hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">{t("nav.logout")}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
