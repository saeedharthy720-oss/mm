import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { formatPrice } from "../lib/formatPrice.js";
import { usePublicSettings } from "../settings/usePublicSettings.js";
import { useOrder } from "./useOrder.js";

export function InvoicePage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const isArabic = i18n.language === "ar";
  const { data: order } = useOrder(id);
  const { data: profile } = usePublicSettings();

  if (!order) return null;

  const storeName = profile ? (isArabic ? profile.nameAr : profile.nameEn) : "";

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
      <p className="text-slate-500">{t("documents.invoiceTitle")}</p>
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

      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-300">
            <th className="py-1 text-start">{t("documents.product")}</th>
            <th className="text-end">{t("documents.qty")}</th>
            <th className="text-end">{t("documents.unitPrice")}</th>
            <th className="text-end">{t("documents.lineTotal")}</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b border-slate-200">
              <td className="py-1">
                {item.productNameSnapshot} ({item.unitLabelSnapshot})
              </td>
              <td className="text-end">{item.quantity}</td>
              <td className="text-end">{formatPrice(item.unitPrice)}</td>
              <td className="text-end">{formatPrice(item.lineTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 flex justify-end">
        <div className="w-56 space-y-1">
          <div className="flex justify-between">
            <span>{t("orders.subtotal")}</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("orders.delivery")}</span>
            <span>{formatPrice(order.deliveryChargeTotal)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-300 pt-1 font-semibold">
            <span>{t("orders.total")}</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <p className="mt-3">
        <strong>{t("documents.paymentMethod")}:</strong>{" "}
        {order.paymentMethod === "card" ? t("orders.card") : t("orders.cod")}
      </p>
    </div>
  );
}
