import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { i18n as I18nInstance } from "i18next";
import { I18nextProvider, useTranslation } from "react-i18next";
import { isRtlLanguage } from "./rtlLanguages.js";

interface LanguageContextValue {
  language: string;
  setLanguage: (language: string) => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function LanguageSync({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(i18n.language);
  const isRtl = isRtlLanguage(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [language, isRtl]);

  const setLanguage = (next: string) => {
    void i18n.changeLanguage(next);
    setLanguageState(next);
  };

  const value = useMemo(() => ({ language, setLanguage, isRtl }), [language, isRtl]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function LanguageProvider({ i18n, children }: { i18n: I18nInstance; children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageSync>{children}</LanguageSync>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
