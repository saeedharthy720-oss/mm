import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  FileText,
  Globe,
  Loader2,
  MapPin,
  MessageCircle,
  Receipt,
  Send,
  User
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../lib/formatPrice.js";
import { STATUS_COLORS } from "./OrdersPage.js";
import { usePublicSettings } from "../settings/usePublicSettings.js";
import { useNotificationRecipients } from "../users/useUsers.js";
import { useOrder, useUpdateOrderStatus } from "./useOrder.js";
import { useOrderStatuses } from "./useOrderStatuses.js";
import { buildWhatsAppMessage, buildWhatsAppUrl, buildWhatsAppWebUrl } from "./whatsapp.js";

export function OrderDetailPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const isArabic = i18n.language === "ar";
  const { data: order, isLoading } = useOrder(id);
  const { data: statuses = [] } = useOrderStatuses();
  const { data: storeProfile } = usePublicSettings();
  const { data: recipients = [] } = useNotificationRecipients();
  const updateStatus = useUpdateOrderStatus(id!);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const BackArrow = isArabic ? ArrowRight : ArrowLeft;

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return <p className="py-16 text-center text-muted-foreground">{t("orders.notFound")}</p>;
  }

  const mapUrl =
    order.deliveryLat && order.deliveryLng
      ? `https://www.google.com/maps?q=${order.deliveryLat},${order.deliveryLng}`
      : null;

  const whatsappMessage = buildWhatsAppMessage(
    order,
    isArabic,
    isArabic ? storeProfile?.nameAr : storeProfile?.nameEn,
    storeProfile?.currency
  );
  const whatsappUrl = buildWhatsAppUrl(order.customerPhone, whatsappMessage);
  const whatsappWebUrl = buildWhatsAppWebUrl(order.customerPhone, whatsappMessage);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-4">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <BackArrow className="h-4 w-4" />
        {t("orders.backToList")}
      </Link>

      <div className="rounded-xl border border-card-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-mono text-xl font-bold text-primary">{order.orderNumber}</h1>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              STATUS_COLORS[order.status.key] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {isArabic ? order.status.labelAr : order.status.labelEn}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p className="flex items-start gap-2">
            <User className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              <span className="font-medium">{order.customerName}</span>
              <span className="text-muted-foreground"> · {order.customerPhone}</span>
            </span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">{order.deliveryAddressText}</span>
          </p>
          {order.deliveryNotes && (
            <p className="text-muted-foreground">
              {t("orders.deliveryNotes")}: {order.deliveryNotes}
            </p>
          )}
          {order.orderNotes && (
            <p className="text-muted-foreground">
              {t("orders.orderNotes")}: {order.orderNotes}
            </p>
          )}
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" />
              {t("orders.openMap")}
            </a>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] font-bold text-white shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <MessageCircle className="h-5 w-5" />
          {t("orders.sendWhatsApp")}
        </a>

        {/* The link above depends on a hand-off to the desktop app that does not
            complete on some machines, leaving a blank page. These two always
            work: WhatsApp Web renders in the browser, and copying lets the
            message be pasted anywhere at all. */}
        <div className="grid gap-2 sm:grid-cols-2">
          <a
            href={whatsappWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:bg-muted"
          >
            <Globe className="h-4 w-4" />
            {t("orders.openWhatsAppWeb")}
          </a>
          <button
            type="button"
            onClick={copyMessage}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:bg-muted"
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            {copied ? t("orders.messageCopied") : t("orders.copyMessage")}
          </button>
        </div>

        <details className="rounded-lg border border-border bg-card px-3 py-2">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
            {t("orders.previewMessage")}
          </summary>
          <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-muted-foreground">
            {whatsappMessage}
          </pre>
        </details>

        {/* Forwarding to colleagues. Click-to-chat cannot deliver on its own,
            so this is one tap per person rather than an automatic notification
            — the admin chooses who appears here on the Staff page. */}
        {recipients.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-2 text-sm font-medium text-muted-foreground">{t("orders.notifyStaff")}</p>
            <div className="flex flex-wrap gap-2">
              {recipients.map((recipient) => (
                <a
                  key={recipient.id}
                  href={buildWhatsAppUrl(recipient.whatsappNumber, whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Send className="h-3.5 w-3.5" />
                  {recipient.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Link
          to={`/orders/${order.id}/delivery-note`}
          target="_blank"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:bg-muted"
        >
          <FileText className="h-4 w-4" />
          {t("documents.printDeliveryNote")}
        </Link>
        <Link
          to={`/orders/${order.id}/invoice`}
          target="_blank"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:bg-muted"
        >
          <Receipt className="h-4 w-4" />
          {t("documents.printInvoice")}
        </Link>
      </div>

      <div className="space-y-2 rounded-xl border border-card-border bg-card p-5 shadow-sm">
        <h2 className="mb-2 font-bold">{t("orders.items")}</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between gap-3 text-sm">
            <span className="text-muted-foreground">
              {item.productNameSnapshot} × {item.quantity} ({item.unitLabelSnapshot})
            </span>
            <span className="shrink-0">{formatPrice(item.lineTotal)}</span>
          </div>
        ))}

        <div className="flex justify-between border-t border-border pt-3 text-sm text-muted-foreground">
          <span>{t("orders.subtotal")}</span>
          <span className="text-foreground">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{t("orders.delivery")}</span>
          <span className="text-foreground">{formatPrice(order.deliveryChargeTotal)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
          <span>{t("orders.total")}</span>
          <span className="text-primary">{formatPrice(order.total)}</span>
        </div>

        <p className="pt-2 text-sm text-muted-foreground">
          {t("orders.paymentMethod")}: {order.paymentMethod === "card" ? t("orders.card") : t("orders.cod")} ·{" "}
          {t("orders.paymentStatus")}: {order.paymentStatus}
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-card-border bg-card p-5 shadow-sm">
        <h2 className="font-bold">{t("orders.updateStatus")}</h2>

        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
        >
          <option value="" disabled>
            {t("orders.selectStatus")}
          </option>
          {statuses.map((orderStatus) => (
            <option key={orderStatus.key} value={orderStatus.key}>
              {isArabic ? orderStatus.labelAr : orderStatus.labelEn}
            </option>
          ))}
        </select>

        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t("orders.notePlaceholder")}
          className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
        />

        <button
          type="button"
          disabled={!selectedStatus || updateStatus.isPending}
          onClick={() => {
            updateStatus.mutate({ statusKey: selectedStatus, note: note || undefined });
            setNote("");
          }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
        >
          {updateStatus.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {updateStatus.isPending ? t("orders.updating") : t("orders.updateStatusButton")}
        </button>
      </div>

      <div className="rounded-xl border border-card-border bg-card p-5 shadow-sm">
        <h2 className="mb-3 font-bold">{t("orders.history")}</h2>
        <ol className="space-y-3">
          {order.statusHistory.map((entry) => (
            <li key={entry.id} className="flex gap-3 text-sm">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
              <div>
                <p className="font-medium">{isArabic ? entry.status.labelAr : entry.status.labelEn}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(entry.changedAt).toLocaleString(isArabic ? "ar" : "en", {
                    dateStyle: "short",
                    timeStyle: "short"
                  })}
                </p>
                {entry.note && <p className="text-muted-foreground">{entry.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
