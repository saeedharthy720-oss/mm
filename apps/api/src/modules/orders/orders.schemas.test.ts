import { describe, expect, it } from "vitest";
import { MAX_LINE_QUANTITY, checkoutSchema } from "./orders.schemas.js";

const base = {
  customerName: "Saeed",
  customerPhone: "79095529",
  deliveryAddressText: "Muscat",
  paymentMethod: "pay_on_delivery" as const
};

function checkoutWithQuantity(quantity: number) {
  return checkoutSchema.safeParse({
    ...base,
    items: [{ productId: "58c81734-bd3c-4fd5-9003-63f71a7ce3fb", quantity }]
  });
}

describe("checkoutSchema", () => {
  it.each([0, -5, 1.5])("rejects a quantity of %s", (quantity) => {
    expect(checkoutWithQuantity(quantity).success).toBe(false);
  });

  it("rejects an empty cart", () => {
    expect(checkoutSchema.safeParse({ ...base, items: [] }).success).toBe(false);
  });

  it("rejects a product id that isn't a uuid", () => {
    const result = checkoutSchema.safeParse({
      ...base,
      items: [{ productId: "not-a-uuid", quantity: 1 }]
    });

    expect(result.success).toBe(false);
  });

  // A product with manualStockOverride skips the stock check, so the schema is
  // the only thing standing between a mistyped quantity and a six-figure order.
  it(`rejects a quantity above ${MAX_LINE_QUANTITY}`, () => {
    expect(checkoutWithQuantity(MAX_LINE_QUANTITY + 1).success).toBe(false);
    expect(checkoutWithQuantity(99_999).success).toBe(false);
  });

  it("still allows a large legitimate order", () => {
    expect(checkoutWithQuantity(MAX_LINE_QUANTITY).success).toBe(true);
    expect(checkoutWithQuantity(5_000).success).toBe(true);
  });

  it("requires a phone number long enough to be real", () => {
    expect(checkoutSchema.safeParse({ ...base, customerPhone: "123", items: [{ productId: "58c81734-bd3c-4fd5-9003-63f71a7ce3fb", quantity: 1 }] }).success).toBe(false);
  });

  it("requires a delivery address", () => {
    expect(
      checkoutSchema.safeParse({
        ...base,
        deliveryAddressText: "",
        items: [{ productId: "58c81734-bd3c-4fd5-9003-63f71a7ce3fb", quantity: 1 }]
      }).success
    ).toBe(false);
  });

  it("rejects an unknown payment method", () => {
    expect(
      checkoutSchema.safeParse({
        ...base,
        paymentMethod: "bank_transfer",
        items: [{ productId: "58c81734-bd3c-4fd5-9003-63f71a7ce3fb", quantity: 1 }]
      }).success
    ).toBe(false);
  });
});
