import { formatPrice } from "../lib/formatPrice.js";
import type { Order } from "./useOrder.js";

// Oman. Customers and shops alike write numbers in local 8-digit form, but
// wa.me only accepts full international numbers — a bare local number opens a
// WhatsApp page that never resolves.
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

/**
 * The message a customer sends to the shop from the confirmation page.
 *
 * Written from the customer's side — "here is my order" — because that is who
 * is sending it. One tap puts the order in the shop's WhatsApp and leaves the
 * customer a copy in their own chat history, which is as close to an automatic
 * notification as free wa.me links allow.
 */
export function buildCustomerOrderMessage(
  order: Order,
  isArabic: boolean,
  currency = "OMR"
): string {
  const money = (value: string | number) => formatPrice(value, currency);
  const divider = "──────────────";
  const lines: string[] = [];

  lines.push(
    isArabic ? "مرحباً 👋 أرسل لكم تفاصيل طلبي:" : "Hello 👋 Here are my order details:",
    "",
    `🧾 ${isArabic ? "رقم الطلب" : "Order number"}: *${order.orderNumber}*`,
    `👤 ${isArabic ? "الاسم" : "Name"}: ${order.customerName}`,
    "",
    `🛒 *${isArabic ? "المنتجات" : "Items"}*`,
    divider
  );

  order.items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.productNameSnapshot}`,
      `   ${isArabic ? "الكمية" : "Qty"}: ${item.quantity} (${item.unitLabelSnapshot})`,
      `   ${money(item.unitPrice)} × ${item.quantity} = *${money(item.lineTotal)}*`
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
    `💳 ${isArabic ? "طريقة الدفع" : "Payment"}: ${isArabic ? "الدفع عند الاستلام" : "Cash on delivery"}`,
    "",
    `📍 *${isArabic ? "عنوان التوصيل" : "Delivery address"}*`,
    order.deliveryAddressText
  );

  if (order.deliveryNotes) {
    lines.push("", `📝 ${isArabic ? "ملاحظات التوصيل" : "Delivery notes"}: ${order.deliveryNotes}`);
  }
  if (order.orderNotes) {
    lines.push(`📝 ${isArabic ? "ملاحظات الطلب" : "Order notes"}: ${order.orderNotes}`);
  }

  lines.push("", isArabic ? "شكراً 🙏" : "Thank you 🙏");

  return lines.join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${toInternationalPhone(phone)}?text=${encodeURIComponent(message)}`;
}
