import { AlertCircle, CreditCard, Loader2, Truck } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext.js";
import { LocationPicker } from "../checkout/LocationPicker.js";
import { formatPrice } from "../lib/formatPrice.js";
import { useCheckout } from "../orders/useCheckout.js";

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { items, subtotal, deliveryChargeTotal, total, clear } = useCart();
  const checkout = useCheckout();
  const isArabic = i18n.language === "ar";

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddressText, setDeliveryAddressText] = useState("");
  const [deliveryLat, setDeliveryLat] = useState<number>();
  const [deliveryLng, setDeliveryLng] = useState<number>();
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const allowsCard = items.every((item) => item.allowCardPayment);
  const allowsCod = items.every((item) => item.allowPayOnDelivery);
  const availableMethods = useMemo(
    () => [...(allowsCard ? (["card"] as const) : []), ...(allowsCod ? (["pay_on_delivery"] as const) : [])],
    [allowsCard, allowsCod]
  );

  const [paymentMethod, setPaymentMethod] = useState<"card" | "pay_on_delivery" | "">(
    availableMethods[0] ?? ""
  );
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!paymentMethod) return;

    const result = await checkout.mutateAsync({
      customerName,
      customerPhone,
      deliveryAddressText,
      deliveryLat,
      deliveryLng,
      deliveryNotes: deliveryNotes || undefined,
      orderNotes: orderNotes || undefined,
      paymentMethod,
      items: items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
    });

    // Set in the same batch as clear() so the empty-cart redirect above doesn't
    // win the race against navigating to the confirmation page.
    setOrderPlaced(true);
    clear();

    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
    } else {
      navigate(`/orders/${result.order.id}`);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("checkout.title")}</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-2">
          <section className="space-y-4 rounded-xl border border-card-border bg-card p-5 shadow-sm">
            <h2 className="font-bold">{t("checkout.yourDetails")}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="customerName">
                  {t("checkout.name")}
                </label>
                <input
                  id="customerName"
                  required
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="customerPhone">
                  {t("checkout.phone")}
                </label>
                <input
                  id="customerPhone"
                  required
                  type="tel"
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="+968XXXXXXXX"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="deliveryAddress">
                {t("checkout.address")}
              </label>
              <textarea
                id="deliveryAddress"
                required
                rows={3}
                value={deliveryAddressText}
                onChange={(event) => setDeliveryAddressText(event.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>

            <div>
              <span className={labelClass}>{t("checkout.pinLocation")}</span>
              <LocationPicker
                onChange={(lat, lng) => {
                  setDeliveryLat(lat);
                  setDeliveryLng(lng);
                }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="deliveryNotes">
                  {t("checkout.deliveryNotes")}
                </label>
                <input
                  id="deliveryNotes"
                  value={deliveryNotes}
                  onChange={(event) => setDeliveryNotes(event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="orderNotes">
                  {t("checkout.orderNotes")}
                </label>
                <input
                  id="orderNotes"
                  value={orderNotes}
                  onChange={(event) => setOrderNotes(event.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border border-card-border bg-card p-5 shadow-sm">
            <h2 className="font-bold">{t("checkout.paymentMethod")}</h2>

            {availableMethods.length === 0 ? (
              <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {t("checkout.noPaymentMethod")}
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {allowsCard && (
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      paymentMethod === "card"
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="accent-[hsl(var(--secondary))]"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{t("checkout.card")}</span>
                  </label>
                )}

                {allowsCod && (
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      paymentMethod === "pay_on_delivery"
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="accent-[hsl(var(--secondary))]"
                      checked={paymentMethod === "pay_on_delivery"}
                      onChange={() => setPaymentMethod("pay_on_delivery")}
                    />
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{t("checkout.cod")}</span>
                  </label>
                )}
              </div>
            )}

            {checkout.isError && (
              <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {t("checkout.error")}
              </p>
            )}

            <button
              type="submit"
              disabled={!paymentMethod || checkout.isPending}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
            >
              {checkout.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {checkout.isPending ? t("checkout.submitting") : t("checkout.placeOrder")}
            </button>
          </section>
        </form>

        <div className="h-fit space-y-3 rounded-xl border border-card-border bg-card p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-bold">{t("checkout.orderSummary")}</h2>

          {items.map((item) => (
            <div key={item.productId} className="flex justify-between gap-3 text-sm">
              <span className="min-w-0 truncate text-muted-foreground">
                {isArabic ? item.nameAr : item.nameEn} × {item.quantity}
              </span>
              <span className="shrink-0">{formatPrice(Number(item.price) * item.quantity)}</span>
            </div>
          ))}

          <div className="flex justify-between border-t border-border pt-3 text-sm text-muted-foreground">
            <span>{t("cart.subtotal")}</span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{t("cart.delivery")}</span>
            <span className="text-foreground">{formatPrice(deliveryChargeTotal)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
            <span>{t("cart.total")}</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
