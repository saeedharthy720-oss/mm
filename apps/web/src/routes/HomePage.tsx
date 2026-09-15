import { Loader2, Package, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../categories/useCategories.js";
import { ProductCard } from "../products/ProductCard.js";
import { useProducts } from "../products/useProducts.js";
import { usePublicSettings } from "../settings/usePublicSettings.js";

export function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categories = [] } = useCategories();
  const { data: profile } = usePublicSettings();
  const { data, isLoading } = useProducts({
    search: search || undefined,
    categoryId: selectedCategory || undefined
  });

  const isArabic = i18n.language === "ar";
  const storeName = profile ? (isArabic ? profile.nameAr : profile.nameEn) : t("appName");
  const topLevelCategories = categories.filter((category) => !category.parentId);

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    if (search) navigate(`/products?search=${encodeURIComponent(search)}`);
  }

  return (
    <div className="space-y-12">
      <section className="relative isolate overflow-hidden rounded-2xl bg-primary text-primary-foreground">
        <div className="hero-hatch absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent rtl:bg-gradient-to-l" />

        <div className="relative z-10 max-w-3xl p-8 md:p-14">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            {t("home.heroTitle", { store: storeName })}
          </h1>
          <p className="mb-8 max-w-xl text-lg text-primary-foreground/80">{t("home.heroSubtitle")}</p>

          <form onSubmit={handleSearchSubmit} className="relative max-w-md">
            <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("nav.searchPlaceholder")}
              className="h-14 w-full rounded-xl border-0 bg-background px-12 text-lg text-foreground shadow-lg outline-none ring-secondary focus:ring-2"
            />
          </form>
        </div>
      </section>

      <div className="flex flex-col items-start gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:sticky md:top-24 md:w-60">
          <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
            {t("products.allCategories")}
          </h2>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-start text-sm font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t("products.allCategories")}
            </button>

            {topLevelCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex w-full items-center justify-between rounded px-3 py-2 text-start text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {isArabic ? category.nameAr : category.nameEn}
              </button>
            ))}
          </div>
        </aside>

        <div className="w-full flex-1">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : data && data.items.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
              <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">{t("products.empty")}</h3>
              <p className="text-muted-foreground">{t("products.emptyHint")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
