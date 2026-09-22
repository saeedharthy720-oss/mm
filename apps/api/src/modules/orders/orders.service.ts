import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import { BadRequestError, ConflictError, NotFoundError } from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { createPaymentProvider } from "../../payments/index.js";
import type { CheckoutInput, ListOrdersQuery, UpdateOrderStatusInput } from "./orders.schemas.js";

type ProductWithUnit = Prisma.ProductGetPayload<{ include: { unit: true } }>;
interface PaymentSession {
  checkoutUrl: string;
  providerReference: string;
  providerName: string;
  amount: Prisma.Decimal;
}

// Exported for tests: these two carry the money arithmetic, where a mistake is
// silent and expensive.
export function mergeDuplicateItems(input: CheckoutInput): CheckoutInput {
  const quantityByProductId = new Map<string, number>();
  for (const item of input.items) {
    quantityByProductId.set(item.productId, (quantityByProductId.get(item.productId) ?? 0) + item.quantity);
  }
  return {
    ...input,
    items: Array.from(quantityByProductId, ([productId, quantity]) => ({ productId, quantity }))
  };
}

async function generateOrderNumber(jitter: number): Promise<string> {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const countToday = await prisma.order.count({ where: { createdAt: { gte: startOfDay } } });
  const sequence = countToday + 1 + jitter;
  return `ORD-${datePart}-${String(sequence).padStart(4, "0")}`;
}

async function loadAndValidateProducts(input: CheckoutInput) {
  const products = await prisma.product.findMany({
    where: { id: { in: input.items.map((item) => item.productId) } },
    include: { unit: true }
  });

  const productById = new Map<string, ProductWithUnit>(products.map((product) => [product.id, product]));

  for (const item of input.items) {
    const product = productById.get(item.productId);
    if (!product || !product.isActive) {
      throw new NotFoundError(`Product ${item.productId} is not available`);
    }
    if (!product.manualStockOverride && product.quantityAvailable < item.quantity) {
      throw new ConflictError(`Insufficient stock for ${product.nameEn}`);
    }
  }

  const allowsCard = input.items.every((item) => productById.get(item.productId)!.allowCardPayment);
  const allowsCod = input.items.every((item) => productById.get(item.productId)!.allowPayOnDelivery);

  if (input.paymentMethod === "card" && !allowsCard) {
    throw new BadRequestError("Card payment is not available for one or more items in this order");
  }
  if (input.paymentMethod === "pay_on_delivery" && !allowsCod) {
    throw new BadRequestError("Pay on delivery is not available for one or more items in this order");
  }

  return productById;
}

export function computeTotals(input: CheckoutInput, productById: Map<string, ProductWithUnit>) {
  let subtotal = new Prisma.Decimal(0);
  let deliveryChargeTotal = new Prisma.Decimal(0);

  const orderItemsData = input.items.map((item) => {
    const product = productById.get(item.productId)!;
    const lineTotal = product.price.times(item.quantity);
    subtotal = subtotal.plus(lineTotal);
    deliveryChargeTotal = deliveryChargeTotal.plus(product.deliveryCharge);

    return {
      productId: product.id,
      productNameSnapshot: product.nameEn,
      unitLabelSnapshot: product.customUnitLabel || product.unit.labelEn,
      quantity: item.quantity,
      unitPrice: product.price,
      deliveryChargeSnapshot: product.deliveryCharge,
      lineTotal
    };
  });

  return { orderItemsData, subtotal, deliveryChargeTotal, total: subtotal.plus(deliveryChargeTotal) };
}

async function attemptCheckout(
  input: CheckoutInput,
  productById: Map<string, ProductWithUnit>,
  retryJitter: number,
  orderId: string,
  paymentSession: PaymentSession | undefined
) {
  const orderNumber = await generateOrderNumber(retryJitter);
  const newStatus = await prisma.orderStatus.findUniqueOrThrow({ where: { key: "new" } });

  const customer = await prisma.customer.upsert({
    where: { phone: input.customerPhone },
    update: { name: input.customerName },
    create: { phone: input.customerPhone, name: input.customerName }
  });

  const { orderItemsData, subtotal, deliveryChargeTotal, total } = computeTotals(input, productById);

  return prisma.$transaction(async (tx) => {
    for (const item of input.items) {
      const product = productById.get(item.productId)!;
      if (product.manualStockOverride) {
        // These products stay purchasable past zero on purpose — the shop
        // restocks them on demand. The counter must still stop at zero, though:
        // decrementing unconditionally drives it far negative, and a stock
        // figure of -99,963 tells the owner nothing about what is on the floor.
        const decremented = await tx.product.updateMany({
          where: { id: product.id, quantityAvailable: { gte: item.quantity } },
          data: { quantityAvailable: { decrement: item.quantity } }
        });
        if (decremented.count === 0) {
          await tx.product.update({ where: { id: product.id }, data: { quantityAvailable: 0 } });
        }
      } else {
        const result = await tx.product.updateMany({
          where: { id: product.id, quantityAvailable: { gte: item.quantity } },
          data: { quantityAvailable: { decrement: item.quantity } }
        });
        if (result.count === 0) {
          throw new ConflictError(`Insufficient stock for ${product.nameEn}`);
        }
      }
    }

    const order = await tx.order.create({
      data: {
        id: orderId,
        orderNumber,
        customerId: customer.id,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        deliveryAddressText: input.deliveryAddressText,
        deliveryLat: input.deliveryLat,
        deliveryLng: input.deliveryLng,
        deliveryNotes: input.deliveryNotes,
        orderNotes: input.orderNotes,
        paymentMethod: input.paymentMethod,
        paymentStatus: "pending",
        statusId: newStatus.id,
        subtotal,
        deliveryChargeTotal,
        total,
        items: { create: orderItemsData }
      },
      include: { items: true, status: true }
    });

    await tx.orderStatusHistory.create({
      data: { orderId: order.id, statusId: newStatus.id, note: "Order placed" }
    });

    if (paymentSession) {
      await tx.payment.create({
        data: {
          orderId: order.id,
          provider: paymentSession.providerName,
          providerReference: paymentSession.providerReference,
          status: "pending",
          amount: paymentSession.amount,
          currency: "OMR"
        }
      });
    }

    return order;
  });
}

export async function checkout(rawInput: CheckoutInput, origin: string) {
  const input = mergeDuplicateItems(rawInput);
  const productById = await loadAndValidateProducts(input);
  const { total } = computeTotals(input, productById);

  // For card payments, the hosted checkout session must be created (and must succeed)
  // BEFORE anything is written to the database — otherwise a Thawani failure would leave
  // behind an order that already decremented stock but has no way to ever be paid for.
  // The order id is generated up front so Thawani's redirect URLs can reference it.
  const orderId = randomUUID();
  let paymentSession: PaymentSession | undefined;

  if (input.paymentMethod === "card") {
    const paymentProvider = createPaymentProvider();
    const session = await paymentProvider.createCheckoutSession({
      orderId,
      orderNumber: "pending", // real order number is assigned atomically once the order is created
      amount: Number(total),
      currency: "OMR",
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      successRedirectUrl: `${origin}/orders/${orderId}?payment=success`,
      cancelRedirectUrl: `${origin}/orders/${orderId}?payment=cancelled`
    });
    paymentSession = {
      checkoutUrl: session.checkoutUrl,
      providerReference: session.providerReference,
      providerName: paymentProvider.name,
      amount: total
    };
  }

  let order;
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const jitter = attempt === 0 ? 0 : attempt + Math.floor(Math.random() * 3);
      order = await attemptCheckout(input, productById, jitter, orderId, paymentSession);
      break;
    } catch (err) {
      lastError = err;
      const isDuplicateOrderNumber =
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002" &&
        (err.meta?.target as string[] | undefined)?.includes("order_number");
      if (!isDuplicateOrderNumber) throw err;
    }
  }
  if (!order) throw lastError;

  return { order, checkoutUrl: paymentSession?.checkoutUrl };
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      status: true,
      payments: { orderBy: { createdAt: "desc" }, take: 1 },
      // changedByUser is intentionally omitted — this endpoint is also used by the
      // public customer order-confirmation page, and staff identities shouldn't leak there.
      statusHistory: { include: { status: true }, orderBy: { changedAt: "asc" } }
    }
  });
  if (!order) throw new NotFoundError("Order not found");
  return order;
}

/**
 * A customer's own orders. Scoped by the customer id on the session rather than
 * anything the caller sends, so one customer cannot read another's orders by
 * changing a parameter.
 */
export async function listOwnOrders(customerId: string, query: ListOrdersQuery) {
  const where: Prisma.OrderWhereInput = { customerId };

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { status: true, items: true },
      orderBy: { createdAt: "desc" },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize
    }),
    prisma.order.count({ where })
  ]);

  return { items, page: query.page, pageSize: query.pageSize, total };
}

export async function listOrders(query: ListOrdersQuery) {
  const where: Prisma.OrderWhereInput = {
    ...(query.status ? { status: { key: query.status } } : {}),
    ...(query.search
      ? {
          OR: [
            { orderNumber: { contains: query.search, mode: "insensitive" } },
            { customerName: { contains: query.search, mode: "insensitive" } },
            { customerPhone: { contains: query.search, mode: "insensitive" } }
          ]
        }
      : {})
  };

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { status: true },
      orderBy: { createdAt: "desc" },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize
    }),
    prisma.order.count({ where })
  ]);

  return { items, page: query.page, pageSize: query.pageSize, total };
}

const CANCELLED = "cancelled";
const DELIVERED = "delivered";

/**
 * Which way stock has to move for a status change. Exported for tests: the
 * arithmetic is silent when it is wrong, and inventory that drifts by a few
 * units per week is only noticed months later.
 *
 * Cancelling returns the goods to the shelf. Reversing a cancellation has to
 * take them off it again — without that, cancel → reopen → cancel credits the
 * same stock twice and the count climbs on its own.
 */
export function stockMovementForStatusChange(fromKey: string, toKey: string): "return" | "deduct" | "none" {
  if (fromKey === toKey) return "none";
  if (toKey === CANCELLED) return "return";
  if (fromKey === CANCELLED) return "deduct";
  return "none";
}

/**
 * Whether deleting an order in this status has to put its stock back.
 *
 * A cancelled order already returned its stock when it was cancelled, and a
 * delivered order's goods physically left the shop — neither is affected by a
 * record being removed. Every other status still has stock deducted on this
 * order's behalf, so deleting it must release that hold or inventory silently
 * shrinks by the size of the order.
 */
export function deletionRestoresStock(statusKey: string): boolean {
  return statusKey !== CANCELLED && statusKey !== DELIVERED;
}

/** Decrements without ever going negative, matching how checkout treats stock. */
async function deductStock(tx: Prisma.TransactionClient, productId: string, quantity: number) {
  const decremented = await tx.product.updateMany({
    where: { id: productId, quantityAvailable: { gte: quantity } },
    data: { quantityAvailable: { decrement: quantity } }
  });
  if (decremented.count === 0) {
    await tx.product.update({ where: { id: productId }, data: { quantityAvailable: 0 } });
  }
}

export async function updateOrderStatus(orderId: string, input: UpdateOrderStatusInput, changedByUserId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true, status: true } });
  if (!order) throw new NotFoundError("Order not found");

  const newStatus = await prisma.orderStatus.findUnique({ where: { key: input.statusKey } });
  if (!newStatus) throw new BadRequestError(`Unknown status: ${input.statusKey}`);

  const movement = stockMovementForStatusChange(order.status.key, newStatus.key);

  return prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      // A null productId means the product was deleted; there is no stock
      // figure left to move.
      if (!item.productId || movement === "none") continue;

      if (movement === "return") {
        await tx.product.update({
          where: { id: item.productId },
          data: { quantityAvailable: { increment: item.quantity } }
        });
      } else {
        await deductStock(tx, item.productId, item.quantity);
      }
    }

    await tx.orderStatusHistory.create({
      data: { orderId, statusId: newStatus.id, changedByUserId, note: input.note }
    });

    return tx.order.update({
      where: { id: orderId },
      data: { statusId: newStatus.id },
      include: {
        items: true,
        status: true,
        statusHistory: { include: { status: true }, orderBy: { changedAt: "asc" } }
      }
    });
  });
}

/**
 * Removes an order and everything hanging off it. Items, payments and status
 * history cascade from the order row, so this is genuinely gone afterwards —
 * there is no recovering it from the dashboard, which is why it sits behind its
 * own permission rather than orders:manage.
 *
 * Returns what was removed so the caller can say so, including whether stock
 * went back, because that is the part a shop owner needs to know about.
 */
export async function deleteOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, status: true }
  });
  if (!order) throw new NotFoundError("Order not found");

  const restoresStock = deletionRestoresStock(order.status.key);

  await prisma.$transaction(async (tx) => {
    if (restoresStock) {
      for (const item of order.items) {
        if (!item.productId) continue;
        await tx.product.update({
          where: { id: item.productId },
          data: { quantityAvailable: { increment: item.quantity } }
        });
      }
    }

    await tx.order.delete({ where: { id: orderId } });
  });

  return {
    orderNumber: order.orderNumber,
    stockRestored: restoresStock,
    itemsRemoved: order.items.length
  };
}
