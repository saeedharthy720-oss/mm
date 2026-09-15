import { ArrowLeft, ArrowRight, CreditCard, Loader2, Package, Truck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart/CartContext.js";
import { formatPrice } from "../lib/formatPrice.js";
import { resolveMediaUrl } from "../lib/resolveMediaUrl.js";
import { useProduct } from "./useProducts.js";

export function ProductDetailPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const isArabic = i18n.language === "ar";
  const BackArrow = isArabic ? ArrowRight : ArrowLeft;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <p className="py-20 text-center text-muted-foreground">{t("product.notFound")}</p>;
  }

  const name = isArabic ? product.nameAr : product.nameEn;
  const description = isArabic ? product.descriptionAr : product.descriptionEn;
  const categoryName = isArabic ? product.category.nameAr : product.category.nameEn;
  const unitLabel = product.customUnitLabel || (isArabic ? product.unit.labelAr : product.unit.labelEn);
  const images = product.images;
  const mainImage = resolveMediaUrl(images[activeImage]?.url);

  return (
    <div className="space-y-6">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <BackArrow className="h-4 w-4" />
        {t("product.backToListing")}
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-card-border bg-muted">
            {mainImage ? (
              <img src={mainImage} alt={name} className="h-full w-full object-cover object-center" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Package className="h-16 w-16 opacity-20" />
              </div>
            )}
            {product.isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <span className="rounded-full border border-border bg-background px-4 py-1.5 font-bold text-destructive shadow-sm">
                  {t("product.outOfStock")}
                </span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                    index === activeImage ? "border-secondary" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={resolveMediaUrl(image.url) ?? ""} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {product.videoUrl && (
            <video
              src={resolveMediaUrl(product.videoUrl) ?? ""}
              controls
              className="w-full rounded-xl border border-card-border"
            />
          )}
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{categoryName}</span>
              <span className="font-mono">{product.sku}</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight">{name}</h1>
          </div>

          <div className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}{" "}
            <span className="text-base font-normal text-muted-foreground">/ {unitLabel}</span>
          </div>

          {description && <p className="leading-relaxed text-muted-foreground">{description}</p>}

          <div className="space-y-2 rounded-xl border border-card-border bg-card p-4 text-sm">
            {Number(product.deliveryCharge) > 0 && (
              <p className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4 shrink-0 text-primary" />
                {t("product.deliveryCharge")}: {formatPrice(product.deliveryCharge)}
              </p>
            )}
            {product.allowCardPayment && (
              <p className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4 shrink-0 text-primary" />
                {t("product.cardAccepted")}
              </p>
            )}
            {product.allowPayOnDelivery && (
              <p className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4 shrink-0 text-primary" />
                {t("product.codAccepted")}
              </p>
            )}
          </div>

          {product.isOutOfStock ? (
            <p className="font-bold text-destructive">{t("product.outOfStock")}</p>
          ) : (
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                className="h-12 w-20 rounded-lg border border-input bg-card px-3 text-center outline-none ring-ring focus:ring-2"
              />
              <button
                type="button"
                onClick={() => addItem(product, quantity)}
                className="h-12 flex-1 rounded-lg bg-secondary px-6 font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {t("product.addToCart")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
