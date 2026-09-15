import { useLanguage } from "@bms/shared-i18n";
import { Globe, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "../cart/CartContext.js";
import { useCategories } from "../categories/useCategories.js";
import { usePublicSettings } from "../settings/usePublicSettings.js";

export function StoreLayout() {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { data: categories = [] } = useCategories();
  const { data: profile } = usePublicSettings();
  const { itemCount } = useCart();

  const isArabic = i18n.language === "ar";
  const storeName = profile ? (isArabic ? profile.nameAr : profile.nameEn) : t("appName");
  const topLevelCategories = categories.filter((category) => !category.parentId);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-primary/20 bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-secondary font-bold text-secondary-foreground">
              BM
            </span>
            <span className="hidden text-lg font-bold sm:inline-block">{storeName}</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-secondary" : "text-primary-foreground/80 hover:text-secondary"
              }
            >
              {t("nav.home")}
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-secondary" : "text-primary-foreground/80 hover:text-secondary"
              }
            >
              {t("nav.products")}
            </NavLink>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              title={language === "en" ? "العربية" : "English"}
              className="flex h-10 w-10 items-center justify-center rounded text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">{language === "en" ? "العربية" : "English"}</span>
            </button>

            <Link
              to="/cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -end-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground shadow-sm transition-transform group-hover:scale-110">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">{t("nav.cart")}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-border bg-card py-10 text-sm">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">{storeName}</h3>
            {profile?.whatsappNumber && (
              <p className="text-muted-foreground">
                {t("footer.contact")}: {profile.whatsappNumber}
              </p>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">{t("nav.products")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/products" className="hover:text-foreground">
                  {t("products.allCategories")}
                </Link>
              </li>
              {topLevelCategories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.id}`} className="hover:text-foreground">
                    {isArabic ? category.nameAr : category.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">{t("footer.help")}</h3>
            <p className="text-muted-foreground">{t("footer.helpBody")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
