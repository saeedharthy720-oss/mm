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

/**
 * Ceiling for the whole click-to-chat URL.
 *
 * Percent-encoding is brutal on this message: an Arabic letter costs 6 URL
 * characters, an emoji 12, and a box-drawing character 9. A visually modest
 * 563-character order came to 2,661 once encoded, and WhatsApp stopped opening
 * it — the tab sat on "Loading…" forever rather than reporting anything.
 *
 * 1,800 keeps a normal order comfortably inside what clients handle, and the
 * message is built compactly so that reaching this cap takes an unusually large
 * order rather than a typical one.
 */
const MAX_URL_LENGTH = 1800;

// Oman. Customers write numbers in local 8-digit form, but click-to-chat needs
// the full international number as digits only — no "+", spaces or leading zero.
const DEFAULT_COUNTRY_CODE = "968";
const LOCAL_NUMBER_LENGTH = 8;

export function toInternationalPhone(phone: string, countryCode = DEFAULT_COUNTRY_CODE): string {
  let digits = phone.replace(/\D/g, "");

  // 00968... is the same as +968...
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // The length check matters: a local number can itself begin with "968", and
  // prefixing that again produces a number WhatsApp cannot resolve.
  if (digits.length > LOCAL_NUMBER_LENGTH && digits.startsWith(countryCode)) {
    return digits;
  }

  return `${countryCode}${digits.replace(/^0+/, "")}`;
}

/** Whether a number can plausibly open a chat, so callers can skip a dead link. */
export function isUsablePhone(phone: string | null | undefined): boolean {
  if (!phone) return false;
  const digits = toInternationalPhone(phone);
  // Country code plus a subscriber number; anything shorter is a typo.
  return /^\d{10,15}$/.test(digits);
}

function formatOrderDate(iso: string, isArabic: boolean): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  // -u-nu-latn keeps Latin digits in Arabic, matching the prices alongside it.
  return date.toLocaleString(isArabic ? "ar-OM-u-nu-latn" : "en-GB", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

/**
 * The order summary sent to the customer.
 *
 * Deliberately compact. Decoration is expensive here in a way it is not on a
 * page: the previous version's two box-drawing dividers cost 252 URL characters
 * between them, and its thirteen emoji another 156, none of which carried
 * information. Structure now comes from line breaks and a handful of emoji.
 */
export function buildWhatsAppMessage(
  order: OrderDetail,
  isArabic: boolean,
  storeName?: string,
  currency = "OMR"
): string {
  const lang = isArabic ? "ar" : "en";
  const money = (value: string | number) => formatPrice(value, currency);
  const lines: string[] = [];

  if (storeName) lines.push(`🏪 ${storeName}`);

  lines.push(
    `${isArabic ? "طلب" : "Order"} *${order.orderNumber}*`,
    `${isArabic ? "العميل" : "Customer"}: ${order.customerName}`,
    `${isArabic ? "التاريخ" : "Date"}: ${formatOrderDate(order.createdAt, isArabic)}`,
    `${isArabic ? "الحالة" : "Status"}: ${isArabic ? order.status.labelAr : order.status.labelEn}`,
    "",
    `🛒 ${isArabic ? "المنتجات" : "Items"}`
  );

  for (const item of order.items) {
    lines.push(
      `• ${item.productNameSnapshot} × ${item.quantity} (${item.unitLabelSnapshot}) = ${money(item.lineTotal)}`
    );
  }

  lines.push(
    "",
    `${isArabic ? "المجموع" : "Subtotal"}: ${money(order.subtotal)}`,
    `${isArabic ? "التوصيل" : "Delivery"}: ${money(order.deliveryChargeTotal)}`,
    `*${isArabic ? "الإجمالي" : "Total"}: ${money(order.total)}*`,
    `${isArabic ? "الدفع" : "Payment"}: ${PAYMENT_METHOD_LABELS[order.paymentMethod][lang]} (${PAYMENT_STATUS_LABELS[order.paymentStatus][lang]})`,
    "",
    `📍 ${order.deliveryAddressText}`
  );

  if (order.deliveryLat && order.deliveryLng) {
    lines.push(`https://maps.google.com/?q=${order.deliveryLat},${order.deliveryLng}`);
  }
  if (order.deliveryNotes) {
    lines.push(`${isArabic ? "ملاحظات التوصيل" : "Delivery notes"}: ${order.deliveryNotes}`);
  }
  if (order.orderNotes) {
    lines.push(`${isArabic ? "ملاحظات الطلب" : "Order notes"}: ${order.orderNotes}`);
  }

  return lines.join("\n");
}

/**
 * Trims a message so the finished URL stays under the cap.
 *
 * Cutting on encoded length rather than character count, because the two differ
 * by roughly five times for Arabic. Exported so the length behaviour can be
 * tested directly.
 */
export function fitMessageToUrl(base: string, message: string, maxUrlLength = MAX_URL_LENGTH): string {
  if (base.length + encodeURIComponent(message).length <= maxUrlLength) {
    return message;
  }

  const ellipsis = "…";

  // Step by code point, not by UTF-16 unit. An emoji occupies two units, so
  // trimming one at a time can leave a lone surrogate — and encodeURIComponent
  // throws URIError on that, turning a message that was merely too long into a
  // crash.
  const characters = Array.from(message);
  let end = characters.length;

  while (
    end > 0 &&
    base.length + encodeURIComponent(characters.slice(0, end).join("") + ellipsis).length > maxUrlLength
  ) {
    end -= 1;
  }

  let trimmed = characters.slice(0, end).join("");

  // End on a whole line where that doesn't cost most of the message.
  const lastBreak = trimmed.lastIndexOf("\n");
  if (lastBreak > trimmed.length / 2) {
    trimmed = trimmed.slice(0, lastBreak);
  }

  return trimmed + ellipsis;
}

/**
 * The official click-to-chat URL.
 *
 * api.whatsapp.com rather than wa.me. Both are official and do the same thing,
 * but wa.me does not resolve on every network — on the owner's machine it fails
 * even with no message at all, while api.whatsapp.com opens the desktop app
 * from the same number. wa.me is a .me shortener and is a common casualty of
 * ISP-level DNS filtering; api.whatsapp.com is a WhatsApp domain and is not.
 *
 * One function so the number is normalised and the message encoded exactly
 * once, everywhere.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const base = `https://api.whatsapp.com/send?phone=${toInternationalPhone(phone)}&text=`;
  return base + encodeURIComponent(fitMessageToUrl(base, message));
}

/**
 * WhatsApp Web. The fallback for when the hand-off to a desktop app does not
 * complete and leaves a blank tab — it renders in the browser instead.
 */
export function buildWhatsAppWebUrl(phone: string, message: string): string {
  const base = `https://web.whatsapp.com/send?phone=${toInternationalPhone(phone)}&text=`;
  return base + encodeURIComponent(fitMessageToUrl(base, message));
}
