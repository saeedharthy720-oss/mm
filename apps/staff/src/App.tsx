import { LanguageProvider } from "@bms/shared-i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthGate } from "./auth/AuthGate.js";
import { RequirePermission } from "./auth/RequirePermission.js";
import { useCurrentUser } from "./auth/useAuth.js";
import { CategoriesPage } from "./categories/CategoriesPage.js";
import { i18n } from "./i18n/index.js";
import { StaffLayout } from "./layout/StaffLayout.js";
import { queryClient } from "./lib/queryClient.js";
import { DeliveryNotePage } from "./orders/DeliveryNotePage.js";
import { InvoicePage } from "./orders/InvoicePage.js";
import { OrderDetailPage } from "./orders/OrderDetailPage.js";
import { OrdersPage } from "./orders/OrdersPage.js";
import { ProductFormPage } from "./products/ProductFormPage.js";
import { ProductsPage } from "./products/ProductsPage.js";
import { SettingsPage } from "./settings/SettingsPage.js";

function IndexRedirect() {
  const { data: user } = useCurrentUser();

  if (user?.permissions.includes("orders:view")) return <Navigate to="/orders" replace />;
  if (user?.permissions.includes("products:manage")) return <Navigate to="/products" replace />;
  if (user?.permissions.includes("categories:manage")) return <Navigate to="/categories" replace />;
  if (user?.permissions.includes("settings:manage")) return <Navigate to="/settings" replace />;

  return null;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider i18n={i18n}>
        <BrowserRouter>
          <AuthGate>
            <Routes>
              <Route element={<StaffLayout />}>
                <Route index element={<IndexRedirect />} />
                <Route
                  path="orders"
                  element={
                    <RequirePermission permission="orders:view">
                      <OrdersPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="orders/:id"
                  element={
                    <RequirePermission permission="orders:view">
                      <OrderDetailPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="products"
                  element={
                    <RequirePermission permission="products:manage">
                      <ProductsPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="products/new"
                  element={
                    <RequirePermission permission="products:manage">
                      <ProductFormPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="products/:id"
                  element={
                    <RequirePermission permission="products:manage">
                      <ProductFormPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="categories"
                  element={
                    <RequirePermission permission="categories:manage">
                      <CategoriesPage />
                    </RequirePermission>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <RequirePermission permission="settings:manage">
                      <SettingsPage />
                    </RequirePermission>
                  }
                />
              </Route>
              <Route
                path="orders/:id/delivery-note"
                element={
                  <RequirePermission permission="orders:view">
                    <DeliveryNotePage />
                  </RequirePermission>
                }
              />
              <Route
                path="orders/:id/invoice"
                element={
                  <RequirePermission permission="orders:view">
                    <InvoicePage />
                  </RequirePermission>
                }
              />
            </Routes>
          </AuthGate>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
