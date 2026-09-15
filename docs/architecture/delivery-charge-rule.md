# Delivery Charge Rule

## v1 rule: sum

Each product has its own `delivery_charge` (e.g. Product A: 1 OMR, Product B: 3 OMR). The order's total delivery charge is the **sum** of the delivery charges of the distinct products in the cart (not multiplied by quantity — one product contributes its delivery charge once regardless of how many units are ordered).

```
order.delivery_charge_total = sum(distinct product.delivery_charge for each product line in the order)
```

This is computed server-side at checkout (never trusted from the client) and snapshotted onto the order as `delivery_charge_total`, with each line's contribution stored on `order_items.delivery_charge_snapshot`.

## Where this lives

The rule identifier is stored in `store_settings` under the key `delivery_charge_rule`, e.g.:

```json
{ "strategy": "sum" }
```

The checkout/order service reads this setting rather than hardcoding "sum" — so later strategies (see below) are a data change plus a new strategy implementation, not a schema migration.

## Future extension points (not built in v1, must not be blocked)

- **Delivery caps**: `{ "strategy": "sum", "max": 5 }` — cap the summed total.
- **Free-delivery threshold**: `{ "strategy": "sum", "freeAbove": 50 }` — waive delivery charge once order subtotal passes a threshold.
- **Delivery zones**: would add a `delivery_zones` table (zone polygon/radius + price) and change the strategy to `"zone"`, keyed off the order's `delivery_lat`/`delivery_lng` (already captured on `orders` in Stage 1).
- **Location-based pricing**: composes with zones — price varies by distance or zone rather than a flat per-product charge.

Because `orders` already stores `delivery_lat`/`delivery_lng` and `store_settings` already holds the strategy as data, all of the above can be added by (a) a new settings shape and (b) a new strategy branch in the order service — no changes to the `products` or `orders` table shape are anticipated.
