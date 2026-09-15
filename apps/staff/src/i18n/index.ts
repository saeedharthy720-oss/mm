import { createI18n } from "@bms/shared-i18n";
import ar from "./locales/ar/common.json";
import en from "./locales/en/common.json";

export const i18n = createI18n({
  resources: {
    en: { common: en },
    ar: { common: ar }
  },
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || "en"
});
