"use client";

import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

export function NavLinks({ items, currentPath }: { items: NavItem[]; currentPath: string }) {
  return (
    <nav className="hidden gap-4 text-sm sm:flex sm:gap-6 sm:text-base">
      {items.map((item) => {
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`link-hover relative text-[#294a84] transition ${isActive ? "font-semibold text-[#0c2c64]" : ""}`}
          >
            {item.label}
            {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0c2c64]" aria-hidden="true" />}
          </Link>
        );
      })}
    </nav>
  );
}
