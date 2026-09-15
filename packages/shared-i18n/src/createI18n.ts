import i18next, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export interface CreateI18nOptions {
  resources: Resource;
  defaultLanguage?: string;
}

export function createI18n({ resources, defaultLanguage = "en" }: CreateI18nOptions) {
  const instance = i18next.createInstance();

  instance.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

  return instance;
}
