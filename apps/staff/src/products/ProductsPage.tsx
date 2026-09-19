import { Package, Pencil, Plus, Search, Trash2, ImageOff } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCategories } from "../categories/useCategories.js";
import { formatPrice } from "../lib/formatPrice.js";
import { resolveMediaUrl } from "../lib/resolveMediaUrl.js";
import { useDeleteProduct, useProducts } from "./useProducts.js";

export function ProductsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: categories = [] } = useCategories();
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(true);
  const { data } = useProducts({ categoryId, search, includeInactive });
  const deleteProduct = useDeleteProduct();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t("products.title")}</h1>
        <Link
          to="/products/new"
          className="flex h-10 items-center gap-2 rounded-lg bg-secondary px-4 text-sm font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          {t("products.addNew")}
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("products.searchPlaceholder")}
            className="h-11 w-full rounded-lg border border-input bg-card px-10 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>

        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="h-11 rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
        >
          <option value="">{t("products.allCategories")}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {isArabic ? category.nameAr : category.nameEn}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={includeInactive}
            onChange={(event) => setIncludeInactive(event.target.checked)}
            className="accent-[hsl(var(--secondary))]"
          />
          {t("products.showHidden")}
        </label>
      </div>

      {data && data.items.length > 0 ? (
        <div className="space-y-2">
          {data.items.map((product) => (
            <div
              key={product.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-card-border bg-card p-4 shadow-sm"
            >
              {/* A catalogue is easier to scan by picture than by name, and it
                  makes a product missing its photo obvious at a glance. */}
              {product.images.length > 0 ? (
                <img
                  src={resolveMediaUrl(product.images[0]!.url) ?? ""}
                  alt=""
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-lg border border-border bg-muted object-cover"
                />
              ) : (
                <div
                  title={t("products.noImage")}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground"
                >
                  <ImageOff className="h-5 w-5" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold">{isArabic ? product.nameAr : product.nameEn}</p>
                  {!product.isActive && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {t("products.hidden")}
                    </span>
                  )}
                  {product.isOutOfStock && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                      {t("products.outOfStock")}
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
              </div>

              <div className="text-sm">
                <p className="font-bold text-primary">{formatPrice(product.price)}</p>
                <p className="text-xs text-muted-foreground">
                  {t("products.stock")}: {product.quantityAvailable}
                </p>
              </div>

              <div className="flex gap-1">
                <Link
                  to={`/products/${product.id}`}
                  title={t("common.edit")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">{t("common.edit")}</span>
                </Link>
                <button
                  type="button"
                  title={t("common.delete")}
                  onClick={() => {
                    if (window.confirm(t("products.confirmDelete"))) deleteProduct.mutate(product.id);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">{t("common.delete")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">{t("products.empty")}</p>
        </div>
      )}
    </div>
  );
}
