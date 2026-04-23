import Link from "next/link";
import Image from "next/image";
import { getLang, t } from "@/lib/i18n";
import { ScrollTopButton } from "@/components/scroll-top-button";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { SiteHeader } from "@/components/site-header";
import { safeSettings } from "@/lib/data";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const settings = await safeSettings();
  const menuLabel = t(lang, "Menü", "Menu");
  const navItems = [
    { href: "/", label: t(lang, "Anasayfa", "Home") },
    { href: "/about", label: t(lang, "Hakkımızda", "About") },
    { href: "/projects", label: t(lang, "Projeler", "Projects") },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: t(lang, "İletişim", "Contact") },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_58%,#ffffff_100%)] text-[#0b1f43]">
      <SiteHeader lang={lang} settings={{ siteLogo: settings.siteLogo || "" }} navItems={navItems} menuLabel={menuLabel} />
      <main className="w-full flex-1 px-4 py-10 sm:px-6 lg:px-8">{children}</main>
      <footer className="border-t border-[#dbe4f4] bg-[#f5f8ff]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="inline-flex items-center gap-3 text-lg font-semibold tracking-wide text-[#0c2c64]">
              {settings.siteLogo ? (
                <Image
                  src={settings.siteLogo}
                  alt="Yapi Istanbul logo"
                  width={98}
                  height={28}
                  unoptimized
                  className="h-6 w-auto object-contain"
                />
              ) : null}
              <span>YAPI ISTANBUL</span>
            </p>
            <p className="mt-3 text-sm text-[#4f6080]">
              {t(lang, "Kent yaşamına değer katan, güvenli ve uzun ömürlü projeler üretir.", "Builds safe, long-lasting projects that elevate city life.")}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1f3f7a]">{t(lang, "Kurumsal", "Corporate")}</p>
            <ul className="mt-3 space-y-2 text-sm text-[#4f6080]">
              <li><Link href="/about" className="link-hover">{t(lang, "Hakkımızda", "About")}</Link></li>
              <li><Link href="/projects" className="link-hover">{t(lang, "Projeler", "Projects")}</Link></li>
              <li><Link href="/blog" className="link-hover">Blog</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1f3f7a]">{t(lang, "İletişim", "Contact")}</p>
            <ul className="mt-3 space-y-2 text-sm text-[#4f6080]">
              <li>
                <Link href="tel:+902120000000" className="link-hover">
                  +90 212 000 00 00
                </Link>
              </li>
              <li>
                <Link href="mailto:info@yapiistanbul.com" className="link-hover">
                  info@yapiistanbul.com
                </Link>
              </li>
              <li>{t(lang, "İstanbul, Türkiye", "Istanbul, Turkey")}</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#1f3f7a]">{t(lang, "Diğer", "Other")}</p>
            <ul className="mt-3 space-y-2 text-sm text-[#4f6080]">
              <li><Link href="/contact" className="link-hover">{t(lang, "Bize Yazın", "Get In Touch")}</Link></li>
              <li><Link href="/blog" className="link-hover">Blog</Link></li>
              <li><Link href="/privacy-policy" className="link-hover">{t(lang, "Gizlilik Politikası", "Privacy Policy")}</Link></li>
              <li><Link href="/cookies-policy" className="link-hover">{t(lang, "Çerez Politikası", "Cookies Policy")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#d4dff0] bg-[#0c2c64] px-4 py-6 text-center text-sm text-white">
          <p>&copy; 2025 Yapı Istanbul. {t(lang, "Tüm hakları saklıdır.", "All rights reserved.")}</p>
        </div>
      </footer>
      <ScrollTopButton />
      <AnalyticsTracker />
    </div>
  );
}
