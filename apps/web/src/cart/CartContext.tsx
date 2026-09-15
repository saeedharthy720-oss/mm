import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../products/useProducts.js";

export interface CartItem {
  productId: string;
  nameEn: string;
  nameAr: string;
  price: string;
  unitLabelEn: string;
  unitLabelAr: string;
  deliveryCharge: string;
  imageUrl: string | null;
  quantity: number;
  allowCardPayment: boolean;
  allowPayOnDelivery: boolean;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  subtotal: number;
  deliveryChargeTotal: number;
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = "bms_cart_v1";
const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product: Product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          nameEn: product.nameEn,
          nameAr: product.nameAr,
          price: product.price,
          unitLabelEn: product.customUnitLabel || product.unit.labelEn,
          unitLabelAr: product.customUnitLabel || product.unit.labelAr,
          deliveryCharge: product.deliveryCharge,
          imageUrl: product.images[0]?.url ?? null,
          quantity,
          allowCardPayment: product.allowCardPayment,
          allowPayOnDelivery: product.allowPayOnDelivery
        }
      ];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.productId !== productId)
        : prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const deliveryChargeTotal = items.reduce((sum, item) => sum + Number(item.deliveryCharge), 0);
  const total = subtotal + deliveryChargeTotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        subtotal,
        deliveryChargeTotal,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
