import { cookies } from "next/headers";
import { cache } from "react";

export type SiteLang = "en" | "tr";

export const getLang = cache(async (): Promise<SiteLang> => {
  const store = await cookies();
  const lang = store.get("site_lang")?.value;
  return lang === "tr" ? "tr" : "en";
});

export const t = (lang: SiteLang, tr: string, en: string) => {
  return lang === "tr" ? tr : en;
};

export function dateLocale(lang: SiteLang) {
  return lang === "tr" ? "tr-TR" : "en-US";
}
