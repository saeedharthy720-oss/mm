import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Shown when a request fails outright. Without this, a failed fetch leaves the
 * data undefined and the page falls through to its empty state — telling the
 * customer the shop has no products when in fact nothing could be loaded.
 */
export function LoadFailed({ onRetry, isRetrying }: { onRetry: () => void; isRetrying?: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 py-16 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
      <h3 className="text-lg font-medium">{t("common.loadFailed")}</h3>
      <p className="mb-5 text-muted-foreground">{t("common.loadFailedHint")}</p>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
        {t("common.retry")}
      </button>
    </div>
  );
}
