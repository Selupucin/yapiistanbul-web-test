"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";

type SiteLang = "en" | "tr";

type NavItem = {
  href: string;
  label: string;
};

export function MobileNav({
  lang,
  navItems,
  menuLabel,
  closeLabel,
}: {
  lang: SiteLang;
  navItems: NavItem[];
  menuLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function onClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-[#c9d9f2] px-3 py-1 text-xs font-semibold text-[#173c78] hover:bg-[#f2f7ff]"
      >
        {open ? closeLabel : menuLabel}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="menu"
          className="absolute right-4 mt-2 w-56 rounded-xl border border-[#dbe6f8] bg-white p-2 shadow-lg"
        >
          <div className="mb-2 border-b border-[#e3ecfa] pb-2">
            <LanguageToggle lang={lang} />
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-[#294a84] transition hover:bg-[#f2f7ff] hover:text-[#0c2c64]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
