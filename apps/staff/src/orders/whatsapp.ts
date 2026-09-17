import { formatPrice } from "../lib/formatPrice.js";
import type { OrderDetail } from "./useOrder.js";

export function buildWhatsAppMessage(order: OrderDetail, isArabic: boolean): string {
  const itemLines = order.items.map(
    (item) => `- ${item.productNameSnapshot} x${item.quantity} (${item.unitLabelSnapshot})`
  );

  const lines = isArabic
    ? [
        `طلب ${order.orderNumber}`,
        `العميل: ${order.customerName}`,
        "",
        "المنتجات:",
        ...itemLines,
        "",
        `الإجمالي: ${formatPrice(order.total)}`,
        `عنوان التوصيل: ${order.deliveryAddressText}`,
        `الحالة الحالية: ${order.status.labelAr}`
      ]
    : [
        `Order ${order.orderNumber}`,
        `Customer: ${order.customerName}`,
        "",
        "Items:",
        ...itemLines,
        "",
        `Total: ${formatPrice(order.total)}`,
        `Delivery address: ${order.deliveryAddressText}`,
        `Current status: ${order.status.labelEn}`
      ];

  if (order.deliveryLat && order.deliveryLng) {
    lines.push(
      `${isArabic ? "الموقع" : "Location"}: https://www.google.com/maps?q=${order.deliveryLat},${order.deliveryLng}`
    );
  }

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
