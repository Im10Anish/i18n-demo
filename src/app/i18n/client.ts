"use client";

import { useEffect, useState } from "react";
import { useLocale } from "../hooks/useLocale";

export function useComponentTranslation(componentName: string) {
  const { locale } = useLocale();
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/locales/${locale}/${componentName}.json`)
      .then((response) => response.json())
      .then((data) => {
        setTranslations(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          `Error loading translations for ${componentName}:`,
          error
        );
        setIsLoading(false);
      });
  }, [locale, componentName]);

  return { translations, isLoading };
}
