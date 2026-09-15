import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { formatPrice } from "../lib/formatPrice.js";
import { usePublicSettings } from "../settings/usePublicSettings.js";
import { useOrder } from "./useOrder.js";

export function DeliveryNotePage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const isArabic = i18n.language === "ar";
  const { data: order } = useOrder(id);
  const { data: profile } = usePublicSettings();

  if (!order) return null;

  const storeName = profile ? (isArabic ? profile.nameAr : profile.nameEn) : "";
  const mapUrl =
    order.deliveryLat && order.deliveryLng
      ? `https://www.google.com/maps?q=${order.deliveryLat},${order.deliveryLng}`
      : null;

  return (
    <div className="mx-auto max-w-2xl bg-white p-8 text-sm text-slate-800 print:p-0">
      <div className="mb-4 flex justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          {t("documents.print")}
        </button>
      </div>

      <h1 className="text-xl font-bold text-brand-700">{storeName}</h1>
      <p className="text-slate-500">{t("documents.deliveryNoteTitle")}</p>
      <hr className="my-3" />

      <div className="grid grid-cols-2 gap-2">
        <p>
          <strong>{t("documents.orderNumber")}:</strong> {order.orderNumber}
        </p>
        <p>
          <strong>{t("documents.date")}:</strong> {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("documents.customer")}:</strong> {order.customerName}
        </p>
        <p>
          <strong>{t("documents.phone")}:</strong> {order.customerPhone}
        </p>
      </div>

      <p className="mt-2">
        <strong>{t("documents.deliveryAddress")}:</strong> {order.deliveryAddressText}
      </p>
      {mapUrl && (
        <p className="break-all text-brand-600">
          <strong className="text-slate-800">{t("orders.openMap")}:</strong> {mapUrl}
        </p>
      )}
      {order.deliveryNotes && (
        <p>
          <strong>{t("documents.deliveryInstructions")}:</strong> {order.deliveryNotes}
        </p>
      )}
      {order.orderNotes && (
        <p>
          <strong>{t("documents.customerNotes")}:</strong> {order.orderNotes}
        </p>
      )}

      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-300">
            <th className="py-1 text-start">{t("documents.product")}</th>
            <th className="text-end">{t("documents.qty")}</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b border-slate-200">
              <td className="py-1">
                {item.productNameSnapshot} ({item.unitLabelSnapshot})
              </td>
              <td className="text-end">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3">
        <strong>{t("documents.paymentMethod")}:</strong>{" "}
        {order.paymentMethod === "card" ? t("orders.card") : t("orders.cod")}
      </p>
      <p>
        <strong>{t("documents.totalToCollect")}:</strong>{" "}
        {order.paymentMethod === "pay_on_delivery" ? formatPrice(order.total) : t("documents.alreadyPaid")}
      </p>

      <div className="mt-10 border-t border-slate-300 pt-4">
        <p>{t("documents.signature")}: ___________________________</p>
      </div>
    </div>
  );
}
