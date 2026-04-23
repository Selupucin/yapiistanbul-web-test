"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { NavLinks } from "@/components/nav-links";

type SiteLang = "en" | "tr";

type NavItem = {
  href: string;
  label: string;
};

export function SiteHeader({
  lang,
  settings,
  navItems,
  menuLabel,
}: {
  lang: SiteLang;
  settings: { siteLogo?: string };
  navItems: NavItem[];
  menuLabel: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[#e0e8f5] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-bold tracking-wide text-[#0c2c64]">
          {settings.siteLogo ? (
            <Image
              src={settings.siteLogo}
              alt="Yapi Istanbul logo"
              width={126}
              height={36}
              unoptimized
              className="h-8 w-auto object-contain"
            />
          ) : null}
          <span>YAPI ISTANBUL</span>
        </Link>
        <NavLinks items={navItems} currentPath={pathname} />

        <div className="hidden sm:block">
          <LanguageToggle lang={lang} />
        </div>

        <details className="sm:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-[#c9d9f2] px-3 py-1 text-xs font-semibold text-[#173c78]">
            {menuLabel}
          </summary>
          <div className="absolute right-4 mt-2 w-48 rounded-xl border border-[#dbe6f8] bg-white p-2 shadow-lg">
            <div className="mb-2 border-b border-[#e3ecfa] pb-2">
              <LanguageToggle lang={lang} />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-[#294a84] transition hover:bg-[#f2f7ff] hover:text-[#0c2c64]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
