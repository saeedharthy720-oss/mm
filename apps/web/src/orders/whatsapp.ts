import { formatPrice } from "../lib/formatPrice.js";
import type { Order } from "./useOrder.js";

/**
 * Ceiling for the whole click-to-chat URL.
 *
 * Percent-encoding is brutal here: an Arabic letter costs 6 URL characters, an
 * emoji 12, a box-drawing character 9. A visually modest order message came to
 * 2,661 characters once encoded and WhatsApp simply stopped opening it — the
 * tab sat on "Loading…" indefinitely rather than reporting anything.
 */
const MAX_URL_LENGTH = 1800;

// Oman. Customers and shops alike write numbers in local 8-digit form, but
// click-to-chat needs the full international number as digits only — no "+",
// spaces or leading zero.
const DEFAULT_COUNTRY_CODE = "968";
const LOCAL_NUMBER_LENGTH = 8;

export function toInternationalPhone(phone: string, countryCode = DEFAULT_COUNTRY_CODE): string {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // The length check matters: a local number can itself begin with "968".
  if (digits.length > LOCAL_NUMBER_LENGTH && digits.startsWith(countryCode)) {
    return digits;
  }

  return `${countryCode}${digits.replace(/^0+/, "")}`;
}

/** Whether a number can plausibly open a chat, so callers can skip a dead link. */
export function isUsablePhone(phone: string | null | undefined): boolean {
  if (!phone) return false;
  return /^\d{10,15}$/.test(toInternationalPhone(phone));
}

/**
 * The message a customer sends to the shop from the confirmation page.
 *
 * Written from the customer's side — "here is my order" — because that is who
 * is sending it. Kept compact: decoration is expensive in a URL in a way it is
 * not on a page, and an order that will not open is worth less than a plain one
 * that will.
 */
export function buildCustomerOrderMessage(order: Order, isArabic: boolean, currency = "OMR"): string {
  const money = (value: string | number) => formatPrice(value, currency);
  const lines: string[] = [];

  lines.push(
    isArabic ? "مرحباً 👋 تفاصيل طلبي:" : "Hello 👋 My order details:",
    `${isArabic ? "طلب" : "Order"} *${order.orderNumber}*`,
    `${isArabic ? "الاسم" : "Name"}: ${order.customerName}`,
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
    `${isArabic ? "الدفع" : "Payment"}: ${isArabic ? "الدفع عند الاستلام" : "Cash on delivery"}`,
    "",
    `📍 ${order.deliveryAddressText}`
  );

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
 * Measured on encoded length rather than character count, because for Arabic
 * the two differ by roughly five times. Exported so the behaviour is testable.
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
 * but wa.me does not resolve on every network — it fails even with no message
 * at all, while api.whatsapp.com opens WhatsApp from the same number. wa.me is
 * a .me shortener and is a common casualty of ISP-level DNS filtering;
 * api.whatsapp.com is a WhatsApp domain and is not.
 *
 * One function so the number is normalised and the message encoded exactly
 * once, everywhere.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const base = `https://api.whatsapp.com/send?phone=${toInternationalPhone(phone)}&text=`;
  return base + encodeURIComponent(fitMessageToUrl(base, message));
}
