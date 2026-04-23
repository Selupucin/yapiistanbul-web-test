import type { SiteLang } from "@/lib/i18n";

type LocalizedEntity = {
  title?: string;
  titleEn?: string;
  content?: string;
  contentEn?: string;
  name?: string;
  nameEn?: string;
};

export function localizedTitle<T extends LocalizedEntity>(item: T, lang: SiteLang) {
  if (lang === "en") return item.titleEn || item.title || "";
  return item.title || item.titleEn || "";
}

export function localizedContent<T extends LocalizedEntity>(item: T, lang: SiteLang) {
  if (lang === "en") return item.contentEn || item.content || "";
  return item.content || item.contentEn || "";
}

export function localizedName<T extends LocalizedEntity>(item: T, lang: SiteLang) {
  if (lang === "en") return item.nameEn || item.name || "";
  return item.name || item.nameEn || "";
}
