import type { SiteLang } from "@/lib/i18n";

type LocalizedEntity = {
  title?: string;
  titleEn?: string;
  content?: string;
  contentEn?: string;
  name?: string;
  nameEn?: string;
  summary?: string;
  summaryEn?: string;
  description?: string;
  descriptionEn?: string;
  location?: string;
  locationEn?: string;
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

export function localizedSummary<T extends LocalizedEntity>(item: T, lang: SiteLang) {
  if (lang === "en") return item.summaryEn || item.summary || "";
  return item.summary || item.summaryEn || "";
}

export function localizedDescription<T extends LocalizedEntity>(item: T, lang: SiteLang) {
  if (lang === "en") return item.descriptionEn || item.description || "";
  return item.description || item.descriptionEn || "";
}

export function localizedLocation<T extends LocalizedEntity>(item: T, lang: SiteLang) {
  if (lang === "en") return item.locationEn || item.location || "";
  return item.location || item.locationEn || "";
}

export function projectCoverImage(p: { images?: string[]; coverImageIndex?: number } | null | undefined): string | null {
  if (!p || !p.images || p.images.length === 0) return null;
  const idx = Math.min(Math.max(p.coverImageIndex ?? 0, 0), p.images.length - 1);
  return p.images[idx] || p.images[0] || null;
}
