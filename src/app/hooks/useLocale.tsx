"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { i18n } from "@/i18n/setting";
import Cookies from "js-cookie";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: i18n.defaultLocale,
  setLocale: () => {},
});

export function LocalProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>(i18n.defaultLocale);

  useEffect(() => {
    const savedLocale = Cookies.get("NEXT_LOCALE");
    if (
      savedLocale &&
      i18n.locales.includes(savedLocale as (typeof i18n.locales)[number])
    ) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale: string) => {
    if (i18n.locales.includes(newLocale as (typeof i18n.locales)[number])) {
      setLocale(newLocale);
      Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });

      window.location.reload(); // Reload the page to apply the new locale
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocalProvider");
  }
  return context;
}
