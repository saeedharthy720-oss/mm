import { isStaff } from "@bms/shared-types";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser, useLogin } from "../auth/useAuth.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium";

/**
 * The single entry point for everyone. Where you land afterwards is decided by
 * what the account can do, not by which form you used: staff go to the
 * dashboard, customers stay in the shop.
 */
export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useLogin();
  const { data: currentUser } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Send an already-signed-in visitor where they belong instead of showing them
  // a login form they have no use for.
  useEffect(() => {
    if (!currentUser) return;
    if (isStaff(currentUser)) {
      window.location.href = "/admin/";
    } else {
      navigate("/account/orders", { replace: true });
    }
  }, [currentUser, navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      const user = await login.mutateAsync({ email, password });

      if (isStaff(user)) {
        // A full page load, not a client-side navigation: the dashboard is a
        // separate bundle served from /admin.
        window.location.href = "/admin/";
      } else {
        navigate("/account/orders", { replace: true });
      }
    } catch (err) {
      setError(getErrorMessage(err, t("auth.loginFailed")));
    }
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="rounded-2xl border border-card-border bg-card p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-bold">{t("auth.loginTitle")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">{t("auth.loginSubtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="email">
              {t("auth.email")}
            </label>
            <input
              id="email"
              type="email"
              required
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="password">
              {t("auth.password")}
            </label>
            <input
              id="password"
              type="password"
              required
              dir="ltr"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClass}
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {login.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            {login.isPending ? t("auth.loggingIn") : t("auth.loginButton")}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {t("auth.noAccount")}{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            {t("auth.registerLink")}
          </Link>
        </p>

        {/* Nobody has to sign in to buy. Saying so here stops the form reading
            as a wall in front of the shop. */}
        <p className="mt-2 text-center text-xs text-muted-foreground">{t("auth.guestNote")}</p>
      </div>
    </div>
  );
}
