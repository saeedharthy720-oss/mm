import { Package, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.js";
import { formatPrice } from "../lib/formatPrice.js";
import { resolveMediaUrl } from "../lib/resolveMediaUrl.js";

export function CartPage() {
  const { t, i18n } = useTranslation();
  const { items, updateQuantity, removeItem, subtotal, deliveryChargeTotal, total } = useCart();
  const isArabic = i18n.language === "ar";

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
        <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="mb-2 text-lg font-medium">{t("cart.empty")}</h2>
        <Link
          to="/products"
          className="inline-block rounded-lg bg-secondary px-5 py-2.5 font-bold text-secondary-foreground shadow-sm"
        >
          {t("cart.continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("nav.cart")}</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => {
            const name = isArabic ? item.nameAr : item.nameEn;
            const unitLabel = isArabic ? item.unitLabelAr : item.unitLabelEn;
            const image = resolveMediaUrl(item.imageUrl);

            return (
              <div
                key={item.productId}
                className="flex items-center gap-4 rounded-xl border border-card-border bg-card p-4 shadow-sm"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <Package className="h-7 w-7 opacity-20" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} / {unitLabel}
                  </p>
                </div>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.productId, Math.max(1, Number(event.target.value)))}
                  className="h-10 w-16 rounded-lg border border-input bg-card px-2 text-center outline-none ring-ring focus:ring-2"
                />

                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  title={t("common.delete")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">{t("common.delete")}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-fit space-y-3 rounded-xl border border-card-border bg-card p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-bold">{t("checkout.orderSummary")}</h2>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{t("cart.subtotal")}</span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{t("cart.delivery")}</span>
            <span className="text-foreground">{formatPrice(deliveryChargeTotal)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
            <span>{t("cart.total")}</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-2 block rounded-lg bg-secondary px-4 py-3 text-center font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {t("cart.checkout")}
          </Link>
          <Link
            to="/products"
            className="block py-1 text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}
