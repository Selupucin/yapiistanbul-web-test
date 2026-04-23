"use client";

import { useState } from "react";
import type { SiteLang } from "@/lib/i18n";

export function LanguageToggle({ lang }: { lang: SiteLang }) {
  const [active, setActive] = useState<SiteLang>(lang);

  const setLang = (next: SiteLang) => {
    setActive(next);
    document.cookie = `site_lang=${next}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  return (
    <div className="inline-flex items-center rounded-full border border-[#cbdaf1] bg-white p-1 text-xs font-semibold text-[#21457f]">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-2 py-1 transition ${active === "en" ? "navy-gradient text-white" : "hover:bg-[#eef4ff]"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("tr")}
        className={`rounded-full px-2 py-1 transition ${active === "tr" ? "navy-gradient text-white" : "hover:bg-[#eef4ff]"}`}
      >
        TR
      </button>
    </div>
  );
}
