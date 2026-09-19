import { AlertCircle, Loader2, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../auth/useAuth.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium";

const MIN_PASSWORD_LENGTH = 8;

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const register = useRegister();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      await register.mutateAsync(form);
      // Registering signs you in, so go straight to the account area.
      navigate("/account/orders", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, t("auth.registerFailed")));
    }
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="rounded-2xl border border-card-border bg-card p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-bold">{t("auth.registerTitle")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">{t("auth.registerSubtitle")}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="name">
              {t("auth.name")}
            </label>
            <input
              id="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              {t("auth.phone")}
            </label>
            <input
              id="phone"
              type="tel"
              required
              dir="ltr"
              autoComplete="tel"
              placeholder="+968XXXXXXXX"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              className={fieldClass}
            />
            {/* Registering with the number used for earlier guest orders pulls
                that history into the account, which is worth saying out loud. */}
            <p className="mt-1 text-xs text-muted-foreground">{t("auth.phoneHint")}</p>
          </div>

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
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
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
              minLength={MIN_PASSWORD_LENGTH}
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              className={fieldClass}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t("auth.passwordHint", { count: MIN_PASSWORD_LENGTH })}
            </p>
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={register.isPending}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {register.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {register.isPending ? t("auth.registering") : t("auth.registerButton")}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {t("auth.haveAccount")}{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            {t("auth.loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
