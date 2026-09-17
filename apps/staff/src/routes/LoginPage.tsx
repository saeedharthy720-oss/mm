import { useLanguage } from "@bms/shared-i18n";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useLogin } from "../auth/useAuth.js";

export function LoginPage() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    login.mutate({ email, password });
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-primary-foreground">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-lg font-bold text-secondary-foreground">
            BM
          </span>
          <h1 className="text-xl font-bold">{t("login.title")}</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-card-border bg-card p-6 shadow-lg"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
              {t("login.email")}
            </label>
            <input
              id="email"
              type="email"
              dir="ltr"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="password">
              {t("login.password")}
            </label>
            <input
              id="password"
              type="password"
              dir="ltr"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>

          {login.isError && (
            <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {t("login.error")}
            </p>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {login.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {login.isPending ? t("login.submitting") : t("login.submit")}
          </button>

          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {language === "en" ? "العربية" : "English"}
          </button>
        </form>
      </div>
    </div>
  );
}
