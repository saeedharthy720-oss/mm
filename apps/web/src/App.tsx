import { LanguageProvider } from "@bms/shared-i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountOrdersPage } from "./account/AccountOrdersPage.js";
import { CartProvider } from "./cart/CartContext.js";
import { i18n } from "./i18n/index.js";
import { StoreLayout } from "./layout/StoreLayout.js";
import { queryClient } from "./lib/queryClient.js";
import { ProductDetailPage } from "./products/ProductDetailPage.js";
import { ProductListingPage } from "./products/ProductListingPage.js";
import { CartPage } from "./routes/CartPage.js";
import { CheckoutPage } from "./routes/CheckoutPage.js";
import { HomePage } from "./routes/HomePage.js";
import { LoginPage } from "./routes/LoginPage.js";
import { OrderConfirmationPage } from "./routes/OrderConfirmationPage.js";
import { RegisterPage } from "./routes/RegisterPage.js";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider i18n={i18n}>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<StoreLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductListingPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="orders/:id" element={<OrderConfirmationPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="account/orders" element={<AccountOrdersPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
