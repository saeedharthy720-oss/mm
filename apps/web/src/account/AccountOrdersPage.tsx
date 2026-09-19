import { isStaff } from "@bms/shared-types";
import { Loader2, Package, ReceiptText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import { useCurrentUser } from "../auth/useAuth.js";
import { LoadFailed } from "../components/LoadFailed.js";
import { formatPrice } from "../lib/formatPrice.js";
import { useMyOrders } from "./useMyOrders.js";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-sky-100 text-sky-800",
  processing: "bg-amber-100 text-amber-800",
  ready_for_delivery: "bg-indigo-100 text-indigo-800",
  out_for_delivery: "bg-purple-100 text-purple-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800"
};

export function AccountOrdersPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data, isLoading, isError, refetch, isFetching } = useMyOrders();

  if (userLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  // Staff have no customer profile, so this page has nothing to show them.
  if (isStaff(user)) {
    window.location.href = "/admin/";
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 py-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ReceiptText className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold">{t("account.ordersTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("account.greeting", { name: user.name })}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-48 items-center justify-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : isError ? (
        <LoadFailed onRetry={() => refetch()} isRetrying={isFetching} />
      ) : data && data.items.length > 0 ? (
        <div className="space-y-3">
          {data.items.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block rounded-xl border border-card-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p dir="ltr" className={`font-mono font-bold text-primary ${isArabic ? "text-end" : ""}`}>
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString(isArabic ? "ar-OM-u-nu-latn" : "en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    STATUS_COLORS[order.status.key] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {isArabic ? order.status.labelAr : order.status.labelEn}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {t("account.itemCount", { count: order.items.length })}
              </p>
              <p className="mt-1 font-bold">{formatPrice(order.total)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium">{t("account.noOrders")}</h3>
          <p className="mb-5 text-muted-foreground">{t("account.noOrdersHint")}</p>
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-secondary px-6 font-bold text-secondary-foreground"
          >
            {t("account.browseProducts")}
          </Link>
        </div>
      )}
    </div>
  );
}
