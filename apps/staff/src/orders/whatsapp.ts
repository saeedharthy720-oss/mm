import { formatPrice } from "../lib/formatPrice.js";
import type { OrderDetail } from "./useOrder.js";

const PAYMENT_METHOD_LABELS = {
  card: { ar: "بطاقة بنكية", en: "Card" },
  pay_on_delivery: { ar: "الدفع عند الاستلام", en: "Cash on delivery" }
} as const;

const PAYMENT_STATUS_LABELS = {
  pending: { ar: "بانتظار الدفع", en: "Pending" },
  paid: { ar: "مدفوع", en: "Paid" },
  failed: { ar: "فشل الدفع", en: "Failed" },
  refunded: { ar: "مُسترجع", en: "Refunded" }
} as const;

function formatOrderDate(iso: string, isArabic: boolean): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  // -u-nu-latn keeps Latin digits in Arabic: prices and quantities elsewhere in
  // the message are Latin, and mixing them with Arabic-Indic numerals in the
  // same message reads as a mistake.
  // en-GB rather than en-US so both locales read day/month/year.
  return date.toLocaleString(isArabic ? "ar-OM-u-nu-latn" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function buildWhatsAppMessage(
  order: OrderDetail,
  isArabic: boolean,
  storeName?: string,
  currency = "OMR"
): string {
  const lang = isArabic ? "ar" : "en";
  const money = (value: string | number) => formatPrice(value, currency);

  const lines: string[] = [];
  const divider = "──────────────";

  if (storeName) {
    lines.push(`🏪 *${storeName}*`, "");
  }

  lines.push(
    isArabic ? `مرحباً ${order.customerName} 👋` : `Hello ${order.customerName} 👋`,
    isArabic ? "تم استلام طلبك بنجاح ✅" : "We've received your order ✅",
    "",
    `🧾 ${isArabic ? "رقم الطلب" : "Order number"}: *${order.orderNumber}*`,
    `📅 ${isArabic ? "التاريخ" : "Date"}: ${formatOrderDate(order.createdAt, isArabic)}`,
    `📌 ${isArabic ? "الحالة" : "Status"}: ${isArabic ? order.status.labelAr : order.status.labelEn}`,
    "",
    `🛒 *${isArabic ? "المنتجات" : "Items"}*`,
    divider
  );

  order.items.forEach((item, index) => {
    const lineTotal = money(item.lineTotal);
    lines.push(
      `${index + 1}. ${item.productNameSnapshot}`,
      `   ${isArabic ? "الكمية" : "Qty"}: ${item.quantity} (${item.unitLabelSnapshot})`,
      `   ${money(item.unitPrice)} × ${item.quantity} = *${lineTotal}*`
    );
  });

  lines.push(
    "",
    `💰 *${isArabic ? "الحساب" : "Summary"}*`,
    divider,
    `${isArabic ? "المجموع الفرعي" : "Subtotal"}: ${money(order.subtotal)}`,
    `${isArabic ? "رسوم التوصيل" : "Delivery"}: ${money(order.deliveryChargeTotal)}`,
    `*${isArabic ? "الإجمالي" : "Total"}: ${money(order.total)}*`,
    "",
    `💳 ${isArabic ? "طريقة الدفع" : "Payment"}: ${PAYMENT_METHOD_LABELS[order.paymentMethod][lang]}`,
    `${isArabic ? "حالة الدفع" : "Payment status"}: ${PAYMENT_STATUS_LABELS[order.paymentStatus][lang]}`,
    "",
    `📍 *${isArabic ? "عنوان التوصيل" : "Delivery address"}*`,
    order.deliveryAddressText
  );

  if (order.deliveryLat && order.deliveryLng) {
    lines.push(
      `🗺️ ${isArabic ? "الموقع على الخريطة" : "Map location"}: https://www.google.com/maps?q=${order.deliveryLat},${order.deliveryLng}`
    );
  }

  if (order.deliveryNotes) {
    lines.push("", `📝 ${isArabic ? "ملاحظات التوصيل" : "Delivery notes"}: ${order.deliveryNotes}`);
  }

  if (order.orderNotes) {
    lines.push(`📝 ${isArabic ? "ملاحظات الطلب" : "Order notes"}: ${order.orderNotes}`);
  }

  lines.push("", isArabic ? "شكراً لتعاملك معنا 🙏" : "Thank you for your order 🙏");

  return lines.join("\n");
}

// Oman. Customers routinely type their number in local 8-digit form, but wa.me
// only accepts full international numbers, so the country code has to be filled
// in for them — a bare "97373394" opens a WhatsApp page that never resolves.
const DEFAULT_COUNTRY_CODE = "968";
const LOCAL_NUMBER_LENGTH = 8;

export function toInternationalPhone(phone: string, countryCode = DEFAULT_COUNTRY_CODE): string {
  let digits = phone.replace(/\D/g, "");

  // 00968... is the same as +968...
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // Already international. The length check matters: a local number can itself
  // begin with "968" (e.g. 96812345), and prefixing it again would be wrong.
  if (digits.length > LOCAL_NUMBER_LENGTH && digits.startsWith(countryCode)) {
    return digits;
  }

  // Local form, possibly with a trunk prefix.
  return `${countryCode}${digits.replace(/^0+/, "")}`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${toInternationalPhone(phone)}?text=${encodeURIComponent(message)}`;
}

/**
 * wa.me hands off to the installed desktop app, which on some machines leaves a
 * blank page waiting forever. This goes straight to WhatsApp Web instead, which
 * renders in the browser for anyone already signed in there.
 */
export function buildWhatsAppWebUrl(phone: string, message: string): string {
  return `https://web.whatsapp.com/send?phone=${toInternationalPhone(phone)}&text=${encodeURIComponent(message)}`;
}
