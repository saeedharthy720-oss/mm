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

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digitsOnly = phone.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
