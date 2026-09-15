import type { ReactNode } from "react";
import { LoginPage } from "../routes/LoginPage.js";
import { useCurrentUser } from "./useAuth.js";

export function AuthGate({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;
  if (!user) return <LoginPage />;
  return <>{children}</>;
}
