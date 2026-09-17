import { AlertCircle, CheckCircle2, Loader2, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../lib/getErrorMessage.js";
import { useSettings, useUpdateSetting, type StoreProfile } from "./useSettings.js";

const emptyProfile: StoreProfile = { nameEn: "", nameAr: "", whatsappNumber: "", currency: "OMR" };
const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium";

export function SettingsPage() {
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  const updateSetting = useUpdateSetting();
  const [profile, setProfile] = useState<StoreProfile>(emptyProfile);

  useEffect(() => {
    if (settings?.store_profile) {
      setProfile(settings.store_profile as StoreProfile);
    }
  }, [settings]);

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Store className="h-5 w-5" />
        </span>
        <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          updateSetting.mutate({ key: "store_profile", value: profile });
        }}
        className="space-y-4 rounded-xl border border-card-border bg-card p-5 shadow-sm"
      >
        <div>
          <label className={labelClass} htmlFor="storeNameEn">
            {t("settings.storeNameEn")}
          </label>
          <input
            id="storeNameEn"
            value={profile.nameEn}
            onChange={(event) => setProfile({ ...profile, nameEn: event.target.value })}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="storeNameAr">
            {t("settings.storeNameAr")}
          </label>
          <input
            id="storeNameAr"
            dir="rtl"
            value={profile.nameAr}
            onChange={(event) => setProfile({ ...profile, nameAr: event.target.value })}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="whatsappNumber">
            {t("settings.whatsappNumber")}
          </label>
          <input
            id="whatsappNumber"
            value={profile.whatsappNumber}
            onChange={(event) => setProfile({ ...profile, whatsappNumber: event.target.value })}
            placeholder="+968XXXXXXXX"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="currency">
            {t("settings.currency")}
          </label>
          <input
            id="currency"
            value={profile.currency}
            onChange={(event) => setProfile({ ...profile, currency: event.target.value })}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={updateSetting.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {updateSetting.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {updateSetting.isPending ? t("common.saving") : t("common.save")}
        </button>

        {updateSetting.isSuccess && (
          <p className="flex items-center justify-center gap-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            {t("settings.saved")}
          </p>
        )}

        {updateSetting.isError && (
          <p className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {getErrorMessage(updateSetting.error, t("common.saveFailed"))}
          </p>
        )}
      </form>
    </div>
  );
}
