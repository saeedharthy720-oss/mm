import { z } from "zod";

// An upper bound on a single line. Products with manualStockOverride skip the
// stock check entirely, so without this a slipped keystroke in the quantity box
// becomes a six-figure order that looks perfectly valid to the system.
// Deliberately generous — a large construction order should still go through.
export const MAX_LINE_QUANTITY = 10_000;

export const checkoutSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(6),
  deliveryAddressText: z.string().min(1),
  deliveryLat: z.number().optional(),
  deliveryLng: z.number().optional(),
  deliveryNotes: z.string().optional(),
  orderNotes: z.string().optional(),
  paymentMethod: z.enum(["card", "pay_on_delivery"]),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive().max(MAX_LINE_QUANTITY)
      })
    )
    .min(1)
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const listOrdersQuerySchema = z.object({
  status: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20)
});

export const updateOrderStatusSchema = z.object({
  statusKey: z.string().min(1),
  note: z.string().optional()
});

export type ListOrdersQuery = z.infer<typeof listOrdersQuerySchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
