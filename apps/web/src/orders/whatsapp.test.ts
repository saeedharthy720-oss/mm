import { describe, expect, it } from "vitest";
import { buildCustomerOrderMessage, buildWhatsAppUrl, toInternationalPhone } from "./whatsapp.js";
import type { Order } from "./useOrder.js";

const order = {
  id: "x",
  orderNumber: "ORD-20260919-0007",
  customerName: "Saeed",
  deliveryAddressText: "سلطنة عُمان، مسقط، السيب، الخوض",
  deliveryNotes: null,
  orderNotes: null,
  paymentMethod: "pay_on_delivery",
  paymentStatus: "pending",
  subtotal: "22",
  deliveryChargeTotal: "1",
  total: "23",
  items: [
    {
      id: "1",
      productNameSnapshot: "Cement",
      unitLabelSnapshot: "Bag",
      quantity: 2,
      unitPrice: "11",
      lineTotal: "22"
    }
  ],
  status: { key: "new", labelEn: "New", labelAr: "جديد" }
} as unknown as Order;

describe("toInternationalPhone", () => {
  it.each([
    ["97373394", "96897373394"],
    ["+968 7909 5529", "96879095529"],
    ["0096879095529", "96879095529"],
    ["079095529", "96879095529"]
  ])("normalises %s to %s", (input, expected) => {
    expect(toInternationalPhone(input)).toBe(expected);
  });
});

describe("buildCustomerOrderMessage", () => {
  it("is written from the customer's side, since they are the sender", () => {
    // The dashboard's message addresses the customer; this one is the customer
    // addressing the shop. Getting them the wrong way round reads as nonsense.
    expect(buildCustomerOrderMessage(order, false)).toContain("My order details");
    expect(buildCustomerOrderMessage(order, true)).toContain("تفاصيل طلبي");
  });

  it("carries the order number, line maths and totals", () => {
    const message = buildCustomerOrderMessage(order, false);

    expect(message).toContain("ORD-20260919-0007");
    expect(message).toContain("Cement × 2 (Bag) = 22.000 OMR");
    expect(message).toContain("Subtotal: 22.000 OMR");
    expect(message).toContain("Total: 23.000 OMR*");
  });

  it("carries the picked delivery address", () => {
    expect(buildCustomerOrderMessage(order, true)).toContain("سلطنة عُمان، مسقط، السيب، الخوض");
  });

  it("says cash on delivery rather than leaking the enum value", () => {
    expect(buildCustomerOrderMessage(order, false)).toContain("Cash on delivery");
    expect(buildCustomerOrderMessage(order, false)).not.toContain("pay_on_delivery");
  });

  it("includes notes only when they were given", () => {
    expect(buildCustomerOrderMessage(order, false)).not.toContain("Delivery notes");

    const noted = { ...order, deliveryNotes: "Call first" } as Order;
    expect(buildCustomerOrderMessage(noted, false)).toContain("Delivery notes: Call first");
  });

  it("respects the store's currency", () => {
    expect(buildCustomerOrderMessage(order, false, "AED")).toContain("23.000 AED");
  });
});

describe("buildWhatsAppUrl", () => {
  it("normalises the number and encodes the message", () => {
    const url = buildWhatsAppUrl("97373394", "line one\nline two");

    expect(url).toContain("wa.me/96897373394");
    expect(url).toContain("%0A");
    expect(url).not.toContain("\n");
  });
});
