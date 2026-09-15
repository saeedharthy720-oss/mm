import { ClipboardList, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/formatPrice.js";
import { useOrderStatuses } from "./useOrderStatuses.js";
import { useOrders } from "./useOrders.js";

export const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  processing: "bg-amber-100 text-amber-800",
  ready_for_delivery: "bg-purple-100 text-purple-800",
  out_for_delivery: "bg-indigo-100 text-indigo-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800"
};

export function OrdersPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: statuses = [] } = useOrderStatuses();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useOrders({ status, search });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">{t("orders.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("orders.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("orders.searchPlaceholder")}
            className="h-11 w-full rounded-lg border border-input bg-card px-10 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-11 rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
        >
          <option value="">{t("orders.allStatuses")}</option>
          {statuses.map((orderStatus) => (
            <option key={orderStatus.key} value={orderStatus.key}>
              {isArabic ? orderStatus.labelAr : orderStatus.labelEn}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex h-48 items-center justify-center text-muted-foreground">
          <Loader2 className="h-7 w-7 animate-spin" />
        </div>
      ) : data && data.items.length > 0 ? (
        <div className="space-y-2">
          {data.items.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block rounded-xl border border-card-border bg-card p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono font-bold text-primary">{order.orderNumber}</span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    STATUS_COLORS[order.status.key] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {isArabic ? order.status.labelAr : order.status.labelEn}
                </span>
              </div>

              <p className="mt-1 text-sm font-medium">{order.customerName}</p>
              <p className="text-sm text-muted-foreground">{order.customerPhone}</p>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-bold">
                  {formatPrice(order.total)}
                  <span className="ms-2 font-normal text-muted-foreground">
                    {order.paymentMethod === "card" ? t("orders.card") : t("orders.cod")}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString(isArabic ? "ar" : "en", {
                    dateStyle: "short",
                    timeStyle: "short"
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <ClipboardList className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">{t("orders.empty")}</p>
        </div>
      )}
    </div>
  );
}
