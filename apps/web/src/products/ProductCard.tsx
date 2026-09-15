import { Package, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.js";
import { formatPrice } from "../lib/formatPrice.js";
import { resolveMediaUrl } from "../lib/resolveMediaUrl.js";
import type { Product } from "./useProducts.js";

export function ProductCard({ product }: { product: Product }) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();

  const isArabic = i18n.language === "ar";
  const name = isArabic ? product.nameAr : product.nameEn;
  const categoryName = isArabic ? product.category.nameAr : product.category.nameEn;
  const unitLabel = product.customUnitLabel || (isArabic ? product.unit.labelAr : product.unit.labelEn);
  const imageUrl = resolveMediaUrl(product.images[0]?.url);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-card-border bg-card text-card-foreground shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
      <Link to={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">{name}</span>
      </Link>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Package className="h-12 w-12 opacity-20" />
          </div>
        )}

        {product.isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <span className="rounded-full border border-border bg-background px-3 py-1 text-sm font-bold text-destructive shadow-sm">
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{categoryName}</span>
          <span className="font-mono">{product.sku}</span>
        </div>

        <h3 className="mb-2 flex-1 text-lg font-bold leading-tight transition-colors group-hover:text-primary">
          {name}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-primary">
            {formatPrice(product.price)}{" "}
            <span className="text-sm font-normal text-muted-foreground">/ {unitLabel}</span>
          </div>

          <button
            type="button"
            disabled={product.isOutOfStock}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              addItem(product, 1);
            }}
            className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
          >
            <Plus className="h-5 w-5" />
            <span className="sr-only">{t("product.addToCart")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
