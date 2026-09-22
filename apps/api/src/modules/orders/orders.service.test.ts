import { Prisma } from "@prisma/client";
import { describe, expect, it } from "vitest";
import {
  computeTotals,
  deletionRestoresStock,
  mergeDuplicateItems,
  stockMovementForStatusChange
} from "./orders.service.js";
import type { CheckoutInput } from "./orders.schemas.js";

type ProductWithUnit = Parameters<typeof computeTotals>[1] extends Map<string, infer P> ? P : never;

function product(overrides: {
  id: string;
  price: string;
  deliveryCharge: string;
  nameEn?: string;
  customUnitLabel?: string | null;
  unitLabelEn?: string;
}): ProductWithUnit {
  return {
    id: overrides.id,
    nameEn: overrides.nameEn ?? `Product ${overrides.id}`,
    price: new Prisma.Decimal(overrides.price),
    deliveryCharge: new Prisma.Decimal(overrides.deliveryCharge),
    customUnitLabel: overrides.customUnitLabel ?? null,
    unit: { labelEn: overrides.unitLabelEn ?? "Piece" }
  } as unknown as ProductWithUnit;
}

function checkout(items: Array<{ productId: string; quantity: number }>): CheckoutInput {
  return {
    customerName: "Test",
    customerPhone: "79095529",
    deliveryAddressText: "Somewhere",
    paymentMethod: "pay_on_delivery",
    items
  } as unknown as CheckoutInput;
}

describe("mergeDuplicateItems", () => {
  it("adds up quantities of the same product", () => {
    const merged = mergeDuplicateItems(checkout([
      { productId: "a", quantity: 2 },
      { productId: "a", quantity: 3 }
    ]));

    expect(merged.items).toEqual([{ productId: "a", quantity: 5 }]);
  });

  it("leaves distinct products alone", () => {
    const merged = mergeDuplicateItems(checkout([
      { productId: "a", quantity: 1 },
      { productId: "b", quantity: 4 }
    ]));

    expect(merged.items).toEqual([
      { productId: "a", quantity: 1 },
      { productId: "b", quantity: 4 }
    ]);
  });

  it("preserves the rest of the checkout payload", () => {
    const input = checkout([{ productId: "a", quantity: 1 }]);
    const merged = mergeDuplicateItems(input);

    expect(merged.customerName).toBe(input.customerName);
    expect(merged.paymentMethod).toBe(input.paymentMethod);
  });
});

describe("computeTotals", () => {
  it("charges delivery once per product line, not per unit", () => {
    // The whole reason mergeDuplicateItems exists: delivery is a per-product
    // charge, so the same product appearing twice in the cart would otherwise
    // be billed delivery twice.
    const products = new Map([["a", product({ id: "a", price: "11", deliveryCharge: "1" })]]);
    const { subtotal, deliveryChargeTotal, total } = computeTotals(
      checkout([{ productId: "a", quantity: 3 }]),
      products
    );

    expect(subtotal.toString()).toBe("33");
    expect(deliveryChargeTotal.toString()).toBe("1");
    expect(total.toString()).toBe("34");
  });

  it("sums delivery across different products", () => {
    const products = new Map([
      ["a", product({ id: "a", price: "11", deliveryCharge: "1" })],
      ["b", product({ id: "b", price: "2.5", deliveryCharge: "0.75" })]
    ]);

    const { subtotal, deliveryChargeTotal, total } = computeTotals(
      checkout([
        { productId: "a", quantity: 2 },
        { productId: "b", quantity: 4 }
      ]),
      products
    );

    expect(subtotal.toString()).toBe("32");
    expect(deliveryChargeTotal.toString()).toBe("1.75");
    expect(total.toString()).toBe("33.75");
  });

  it("keeps three-decimal baisa precision without float drift", () => {
    // 0.001 * 3 is 0.003000000000000000something in binary floating point.
    const products = new Map([["a", product({ id: "a", price: "0.001", deliveryCharge: "0.002" })]]);
    const { subtotal, total } = computeTotals(checkout([{ productId: "a", quantity: 3 }]), products);

    expect(subtotal.toString()).toBe("0.003");
    expect(total.toString()).toBe("0.005");
  });

  it("snapshots the unit label, preferring a custom one", () => {
    const products = new Map([
      ["a", product({ id: "a", price: "1", deliveryCharge: "0", customUnitLabel: "شوال" })],
      ["b", product({ id: "b", price: "1", deliveryCharge: "0", unitLabelEn: "Bag" })]
    ]);

    const { orderItemsData } = computeTotals(
      checkout([
        { productId: "a", quantity: 1 },
        { productId: "b", quantity: 1 }
      ]),
      products
    );

    expect(orderItemsData[0]!.unitLabelSnapshot).toBe("شوال");
    expect(orderItemsData[1]!.unitLabelSnapshot).toBe("Bag");
  });

  it("records the price that applied at order time", () => {
    const products = new Map([["a", product({ id: "a", price: "11", deliveryCharge: "1" })]]);
    const { orderItemsData } = computeTotals(checkout([{ productId: "a", quantity: 2 }]), products);

    expect(orderItemsData[0]!.unitPrice.toString()).toBe("11");
    expect(orderItemsData[0]!.lineTotal.toString()).toBe("22");
    expect(orderItemsData[0]!.deliveryChargeSnapshot.toString()).toBe("1");
  });

  it("totals a free order to zero rather than failing", () => {
    const products = new Map([["a", product({ id: "a", price: "0", deliveryCharge: "0" })]]);
    const { total } = computeTotals(checkout([{ productId: "a", quantity: 5 }]), products);

    expect(total.toString()).toBe("0");
  });
});

/**
 * Stock is taken out of inventory at checkout and stays out for as long as the
 * order is live. These two decide when it comes back. Both are silent when
 * wrong — nothing errors, the count is just quietly off — so they are pinned
 * here rather than left to the integration path.
 */
describe("stockMovementForStatusChange", () => {
  it("returns stock to the shelf when an order is cancelled", () => {
    expect(stockMovementForStatusChange("processing", "cancelled")).toBe("return");
    expect(stockMovementForStatusChange("new", "cancelled")).toBe("return");
    expect(stockMovementForStatusChange("out_for_delivery", "cancelled")).toBe("return");
  });

  it("takes stock off the shelf again when a cancellation is reversed", () => {
    // Without this, cancel → reopen → cancel credits the same goods twice and
    // the stock figure climbs on its own.
    expect(stockMovementForStatusChange("cancelled", "processing")).toBe("deduct");
    expect(stockMovementForStatusChange("cancelled", "new")).toBe("deduct");
  });

  it("leaves stock alone for ordinary progress through the statuses", () => {
    expect(stockMovementForStatusChange("new", "processing")).toBe("none");
    expect(stockMovementForStatusChange("processing", "ready_for_delivery")).toBe("none");
    expect(stockMovementForStatusChange("ready_for_delivery", "out_for_delivery")).toBe("none");
    expect(stockMovementForStatusChange("out_for_delivery", "delivered")).toBe("none");
  });

  it("does nothing when the status is set to what it already was", () => {
    expect(stockMovementForStatusChange("cancelled", "cancelled")).toBe("none");
    expect(stockMovementForStatusChange("delivered", "delivered")).toBe("none");
  });
});

describe("deletionRestoresStock", () => {
  it("puts stock back for an order that was still holding it", () => {
    expect(deletionRestoresStock("new")).toBe(true);
    expect(deletionRestoresStock("processing")).toBe(true);
    expect(deletionRestoresStock("ready_for_delivery")).toBe(true);
    expect(deletionRestoresStock("out_for_delivery")).toBe(true);
  });

  it("does not credit a cancelled order's stock a second time", () => {
    expect(deletionRestoresStock("cancelled")).toBe(false);
  });

  it("does not invent stock for goods that were already handed over", () => {
    expect(deletionRestoresStock("delivered")).toBe(false);
  });
});
