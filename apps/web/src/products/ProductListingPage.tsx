import { Loader2, Package, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LoadFailed } from "../components/LoadFailed.js";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../categories/useCategories.js";
import { ProductCard } from "./ProductCard.js";
import { useProducts } from "./useProducts.js";

export function ProductListingPage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [] } = useCategories();

  const categoryId = searchParams.get("category") ?? "";
  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const isArabic = i18n.language === "ar";

  const { data, isLoading, isError, refetch, isFetching } = useProducts({
    categoryId: categoryId || undefined,
    search: search || undefined,
    page
  });

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            key={search}
            defaultValue={search}
            onKeyDown={(event) => {
              if (event.key === "Enter") updateParam("search", (event.target as HTMLInputElement).value);
            }}
            placeholder={t("nav.searchPlaceholder")}
            className="h-11 w-full rounded-lg border border-input bg-card px-10 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>

        <select
          value={categoryId}
          onChange={(event) => updateParam("category", event.target.value)}
          className="h-11 rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
        >
          <option value="">{t("products.allCategories")}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {isArabic ? category.nameAr : category.nameEn}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : isError ? (
          <LoadFailed onRetry={() => refetch()} isRetrying={isFetching} />
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

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
          >
            {t("products.previous")}
          </button>
          <span className="text-sm text-muted-foreground">{t("products.pageOf", { page, totalPages })}</span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
          >
            {t("products.next")}
          </button>
        </div>
      )}
    </div>
  );
}
