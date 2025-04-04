export const i18n = {
  defaultLocale: "en-US",
  locales: ["en-US", "es-MX", "fr-FR"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const targetLang = {
  "en-US": "EN",
  "es-MX": "ES",
  "fr-FR": "FR",
};
