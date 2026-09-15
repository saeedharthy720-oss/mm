import { AlertCircle, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { formatPrice } from "../lib/formatPrice.js";
import { useOrder } from "../orders/useOrder.js";

export function OrderConfirmationPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data: order, isLoading } = useOrder(id);
  const paymentQuery = searchParams.get("payment");
  const isArabic = i18n.language === "ar";

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return <p className="py-20 text-center text-muted-foreground">{t("order.notFound")}</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {paymentQuery === "success" && (
        <div className="flex items-start gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          {t("order.paymentSuccess")}
        </div>
      )}
      {paymentQuery === "cancelled" && (
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {t("order.paymentCancelled")}
        </div>
      )}

      <div className="rounded-xl border border-card-border bg-card p-6 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
        <h1 className="mb-1 text-2xl font-bold">{t("order.thankYou")}</h1>
        <p className="font-mono text-lg text-primary">{order.orderNumber}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
          <span className="rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground">
            {isArabic ? order.status.labelAr : order.status.labelEn}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
            {order.paymentMethod === "card" ? t("checkout.card") : t("checkout.cod")} · {order.paymentStatus}
          </span>
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-card-border bg-card p-5 shadow-sm">
        <h2 className="mb-2 font-bold">{t("order.items")}</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between gap-3 text-sm">
            <span className="text-muted-foreground">
              {item.productNameSnapshot} × {item.quantity} ({item.unitLabelSnapshot})
            </span>
            <span className="shrink-0">{formatPrice(item.lineTotal)}</span>
          </div>
        ))}

        <div className="flex justify-between border-t border-border pt-3 text-sm text-muted-foreground">
          <span>{t("cart.subtotal")}</span>
          <span className="text-foreground">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{t("cart.delivery")}</span>
          <span className="text-foreground">{formatPrice(order.deliveryChargeTotal)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
          <span>{t("cart.total")}</span>
          <span className="text-primary">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="rounded-xl border border-card-border bg-card p-5 text-sm shadow-sm">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            <span className="font-medium">{t("order.deliverTo")}:</span>{" "}
            <span className="text-muted-foreground">{order.deliveryAddressText}</span>
          </span>
        </p>
        {order.deliveryNotes && (
          <p className="mt-2 text-muted-foreground">
            {t("order.deliveryNotes")}: {order.deliveryNotes}
          </p>
        )}
      </div>

      <Link
        to="/products"
        className="block rounded-lg border border-border bg-card px-4 py-3 text-center font-medium transition-colors hover:bg-muted"
      >
        {t("cart.continueShopping")}
      </Link>
    </div>
  );
}
