import HomePage from "@/app/components/Home";
import { cookies } from "next/headers";
import { getPageTranslations } from "./i18n/server";
import type { Locale } from "./types/locale";
import { i18n } from "./i18n/setting";

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  const locale: Locale = (localeCookie?.value as Locale) || i18n.defaultLocale;

  const translations = await getPageTranslations(locale, [
    "home",
    "features",
    "languageSelector",
  ]);

  return <HomePage translations={translations} />;
}
