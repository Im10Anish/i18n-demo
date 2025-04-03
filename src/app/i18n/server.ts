import "server-only";
import type { Locale } from "./setting";
import { i18n } from "./setting";
import fs from "fs/promises";
import path from "path";

export const getComponentTranslations = async (
  locale: Locale,
  componentName: string
) => {
  try {
    // validate the locale format
    const validLocale = i18n.locales.includes(locale as Locale)
      ? locale
      : i18n.defaultLocale;

    // Load the component translations file
    const filePath = path.join(
      process.cwd(),
      "src",
      "locales",
      validLocale,
      `${componentName}.json`
    );
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(
      `Error loading translations for ${componentName} in ${locale}:`,
      error
    );

    try {
      // Fallback to the default locale if the specified locale fails
      const filePath = path.join(
        process.cwd(),
        "src",
        "locales",
        i18n.defaultLocale,
        `${componentName}.json`
      );
      const fileContent = await fs.readFile(filePath, "utf8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Failed to load Fallback translations", error);
      return {};
    }
  }
};

export const getPageTranslations = async (
  locale: Locale,
  componentNames: string[]
) => {
  const translations: Record<string, Record<string, string>> = {};
  for (const componentName of componentNames) {
    translations[componentName] = await getComponentTranslations(
      locale,
      componentName
    );
  }
  return translations;
};
