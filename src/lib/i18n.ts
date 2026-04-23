import { cookies } from "next/headers";

export type SiteLang = "en" | "tr";

export async function getLang(): Promise<SiteLang> {
  const store = await cookies();
  const lang = store.get("site_lang")?.value;
  return lang === "tr" ? "tr" : "en";
}

export const t = (lang: SiteLang, tr: string, en: string) => {
  return lang === "tr" ? tr : en;
};

export function dateLocale(lang: SiteLang) {
  return lang === "tr" ? "tr-TR" : "en-US";
}
