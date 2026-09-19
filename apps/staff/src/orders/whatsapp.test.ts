import { describe, expect, it } from "vitest";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  buildWhatsAppWebUrl,
  toInternationalPhone
} from "./whatsapp.js";
import type { OrderDetail } from "./useOrder.js";

describe("toInternationalPhone", () => {
  // wa.me only accepts full international numbers. A bare local number produces
  // a WhatsApp page that loads forever rather than reporting an error.
  it.each([
    ["97373394", "96897373394"], // local 8-digit, as customers type it
    ["9737 3394", "96897373394"], // local with a space
    ["+968 7909 5529", "96879095529"], // international, formatted
    ["+96879095529", "96879095529"],
    ["96879095529", "96879095529"], // already bare international
    ["0096879095529", "96879095529"], // 00 instead of +
    ["079095529", "96879095529"], // local trunk zero
    ["96812345", "96896812345"] // local number that itself starts with 968
  ])("normalises %s to %s", (input, expected) => {
    expect(toInternationalPhone(input)).toBe(expected);
  });

  it("accepts a different country code", () => {
    expect(toInternationalPhone("501234567", "971")).toBe("971501234567");
  });
});

const order = {
  orderNumber: "ORD-20260917-0002",
  customerName: "Saeed",
  customerPhone: "97373394",
  deliveryAddressText: "Muscat",
  deliveryLat: null,
  deliveryLng: null,
  deliveryNotes: null,
  orderNotes: null,
  paymentMethod: "pay_on_delivery",
  paymentStatus: "pending",
  subtotal: "22",
  deliveryChargeTotal: "1",
  total: "23",
  createdAt: "2026-09-17T19:58:00.000Z",
  items: [
    {
      id: "1",
      productNameSnapshot: "Cement",
      unitLabelSnapshot: "Bag",
      quantity: 2,
      unitPrice: "11",
      deliveryChargeSnapshot: "1",
      lineTotal: "22"
    }
  ],
  status: { key: "new", labelEn: "New", labelAr: "جديد" }
} as unknown as OrderDetail;

describe("buildWhatsAppMessage", () => {
  it("states the order number, line maths and totals", () => {
    const message = buildWhatsAppMessage(order, false, "My Store");

    expect(message).toContain("ORD-20260917-0002");
    expect(message).toContain("Cement × 2 (Bag) = 22.000 OMR");
    expect(message).toContain("Subtotal: 22.000 OMR");
    expect(message).toContain("Delivery: 1.000 OMR");
    expect(message).toContain("Total: 23.000 OMR*");
  });

  it("names the payment method rather than leaking the enum value", () => {
    expect(buildWhatsAppMessage(order, false)).toContain("Cash on delivery");
    expect(buildWhatsAppMessage(order, true)).toContain("الدفع عند الاستلام");
    expect(buildWhatsAppMessage(order, false)).not.toContain("pay_on_delivery");
  });

  it("uses Latin digits for the date in Arabic, to match the prices", () => {
    const message = buildWhatsAppMessage(order, true);
    const arabicIndicDigits = /[٠-٩]/;

    expect(message).not.toMatch(arabicIndicDigits);
  });

  it("omits the store heading when the store name is unknown", () => {
    expect(buildWhatsAppMessage(order, false)).not.toContain("🏪");
    expect(buildWhatsAppMessage(order, false, "My Store")).toContain("🏪");
  });

  it("includes a map link only when coordinates exist", () => {
    expect(buildWhatsAppMessage(order, false)).not.toContain("google.com/maps");

    const located = { ...order, deliveryLat: "23.58", deliveryLng: "58.38" } as OrderDetail;
    expect(buildWhatsAppMessage(located, false)).toContain("maps.google.com/?q=23.58,58.38");
  });

  it("includes notes only when they were given", () => {
    expect(buildWhatsAppMessage(order, false)).not.toContain("Delivery notes");

    const noted = { ...order, deliveryNotes: "Call first" } as OrderDetail;
    expect(buildWhatsAppMessage(noted, false)).toContain("Delivery notes: Call first");
  });

  it("respects the store's currency", () => {
    expect(buildWhatsAppMessage(order, false, undefined, "AED")).toContain("23.000 AED");
  });
});

describe("whatsapp urls", () => {
  it("normalises the phone in both link styles", () => {
    expect(buildWhatsAppUrl("97373394", "hi")).toContain("wa.me/96897373394");
    expect(buildWhatsAppWebUrl("97373394", "hi")).toContain("phone=96897373394");
  });

  it("encodes the message so newlines survive", () => {
    const url = buildWhatsAppUrl("97373394", "line one\nline two");

    expect(url).toContain("%0A");
    expect(url).not.toContain("\n");
  });
});

/**
 * The failure this guards against: a 563-character Arabic order encoded to
 * 2,661 URL characters and WhatsApp stopped opening it — the tab sat on
 * "Loading…" with no error anywhere. Percent-encoding costs 6 characters per
 * Arabic letter and 12 per emoji, so a message that looks short on screen is
 * not short in a URL.
 */
describe("url length", () => {
  const bigOrder = {
    ...order,
    deliveryAddressText: "سلطنة عُمان، محافظة مسقط، ولاية السيب، منطقة الخوض، خلف الجامع الكبير",
    deliveryNotes: "الرجاء الاتصال قبل الوصول بنصف ساعة على الأقل حتى نجهز المكان",
    orderNotes: "التسليم بعد صلاة العصر وليس قبل ذلك من فضلكم",
    items: Array.from({ length: 12 }, (_, i) => ({
      id: String(i),
      productNameSnapshot: `إسمنت بورتلاندي عالي الجودة نوع ${i}`,
      unitLabelSnapshot: "كيس",
      quantity: 10,
      unitPrice: "11",
      deliveryChargeSnapshot: "1",
      lineTotal: "110"
    }))
  } as unknown as OrderDetail;

  it("keeps a normal Arabic order well under the limit", () => {
    const url = buildWhatsAppUrl(order.customerPhone, buildWhatsAppMessage(order, true, "متجر مواد البناء"));

    expect(url.length).toBeLessThan(1800);
  });

  it("caps a very large order instead of producing a URL that will not open", () => {
    const message = buildWhatsAppMessage(bigOrder, true, "متجر مواد البناء");
    const url = buildWhatsAppUrl(bigOrder.customerPhone, message);

    expect(encodeURIComponent(message).length).toBeGreaterThan(1800);
    expect(url.length).toBeLessThanOrEqual(1800);
    expect(decodeURIComponent(url.split("?text=")[1]!)).toContain("…");
  });

  it("caps the WhatsApp Web link too", () => {
    const message = buildWhatsAppMessage(bigOrder, true, "متجر مواد البناء");

    expect(buildWhatsAppWebUrl(bigOrder.customerPhone, message).length).toBeLessThanOrEqual(1800);
  });

  it("never truncates mid-character", () => {
    const message = buildWhatsAppMessage(bigOrder, true, "متجر مواد البناء");
    const text = buildWhatsAppUrl(bigOrder.customerPhone, message).split("?text=")[1]!;

    // A split surrogate pair or half-encoded byte throws here.
    expect(() => decodeURIComponent(text)).not.toThrow();
    expect(decodeURIComponent(text)).not.toContain("�");
  });
});

describe("encoding", () => {
  it("encodes exactly once", () => {
    const url = buildWhatsAppUrl("97373394", "مرحبا 👋");

    // Double encoding turns "%" into "%25" and WhatsApp shows the escapes.
    expect(url).not.toContain("%25");
    expect(decodeURIComponent(url.split("?text=")[1]!)).toBe("مرحبا 👋");
  });

  it.each(["a & b", "50% off", "#order", "what?", "a+b", "100% مرحبا"])(
    "round-trips %s, which would otherwise break the query string",
    (text) => {
      const url = buildWhatsAppUrl("97373394", text);

      expect(decodeURIComponent(url.split("?text=")[1]!)).toBe(text);
    }
  );

  it("produces a phone segment of digits only", () => {
    const url = buildWhatsAppUrl("+968 9737-3394", "hi");
    const phoneSegment = url.slice("https://wa.me/".length, url.indexOf("?"));

    expect(phoneSegment).toMatch(/^\d+$/);
    expect(phoneSegment).toBe("96897373394");
  });
});
