import { COUNTRY_NAME_AR, COUNTRY_NAME_EN, OMAN_GOVERNORATES, findGovernorate } from "@bms/shared-types";
import { useTranslation } from "react-i18next";

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium";

export interface OmanAddress {
  governorate: string;
  wilayat: string;
  area: string;
  details: string;
}

export const emptyOmanAddress: OmanAddress = { governorate: "", wilayat: "", area: "", details: "" };

/**
 * Delivery address as a narrowing sequence: country, governorate, wilayat, then
 * the village or area typed in. Picking rather than typing the first levels
 * means orders arrive with a consistent location the shop can sort and search
 * by, instead of whatever prose each customer chose.
 *
 * There is no village list: Oman has thousands and no authoritative source to
 * draw one from, so that level is free text.
 */
export function OmanAddressPicker({
  value,
  onChange
}: {
  value: OmanAddress;
  onChange: (next: OmanAddress) => void;
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const selectedGovernorate = findGovernorate(value.governorate);
  const wilayats = selectedGovernorate?.wilayats ?? [];

  return (
    <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-4">
      <div>
        <span className={labelClass}>{t("checkout.country")}</span>
        {/* Fixed: the shop delivers within Oman only. Shown rather than hidden
            so the sequence reads as the customer expects. */}
        <p className="flex h-11 items-center rounded-lg border border-input bg-muted px-3 text-sm text-muted-foreground">
          {isArabic ? COUNTRY_NAME_AR : COUNTRY_NAME_EN}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="governorate">
            {t("checkout.governorate")}
          </label>
          <select
            id="governorate"
            required
            value={value.governorate}
            onChange={(event) =>
              // Changing governorate invalidates the wilayat below it.
              onChange({ ...value, governorate: event.target.value, wilayat: "" })
            }
            className={fieldClass}
          >
            <option value="" disabled>
              {t("checkout.selectGovernorate")}
            </option>
            {OMAN_GOVERNORATES.map((governorate) => (
              <option key={governorate.nameEn} value={governorate.nameEn}>
                {isArabic ? governorate.nameAr : governorate.nameEn}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="wilayat">
            {t("checkout.wilayat")}
          </label>
          <select
            id="wilayat"
            required
            disabled={!selectedGovernorate}
            value={value.wilayat}
            onChange={(event) => onChange({ ...value, wilayat: event.target.value })}
            className={`${fieldClass} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <option value="" disabled>
              {selectedGovernorate ? t("checkout.selectWilayat") : t("checkout.selectGovernorateFirst")}
            </option>
            {wilayats.map((wilayat) => (
              <option key={wilayat.nameEn} value={wilayat.nameEn}>
                {isArabic ? wilayat.nameAr : wilayat.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="area">
          {t("checkout.area")}
        </label>
        <input
          id="area"
          value={value.area}
          onChange={(event) => onChange({ ...value, area: event.target.value })}
          placeholder={t("checkout.areaPlaceholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="addressDetails">
          {t("checkout.addressDetails")}
        </label>
        <textarea
          id="addressDetails"
          rows={2}
          value={value.details}
          onChange={(event) => onChange({ ...value, details: event.target.value })}
          placeholder={t("checkout.addressDetailsPlaceholder")}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
        />
      </div>
    </div>
  );
}
