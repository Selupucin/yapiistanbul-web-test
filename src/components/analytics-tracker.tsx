"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookiePreferences, type CookiePreferences } from "./cookie-consent";

function detectDeviceType(): "mobile" | "desktop" | "tablet" {
  const ua = (typeof navigator !== "undefined" ? navigator.userAgent : "").toLowerCase();
  const touch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 1;

  if (/ipad|tablet/.test(ua) || (touch && /macintosh/.test(ua))) return "tablet";
  if (/iphone|android|mobile|mobi/.test(ua)) return "mobile";
  return "desktop";
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const [prefs, setPrefs] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    setPrefs(getCookiePreferences());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CookiePreferences>).detail;
      if (detail) setPrefs(detail);
    };
    window.addEventListener("yi:consent-change", handler);
    return () => window.removeEventListener("yi:consent-change", handler);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    if (!prefs || !prefs.analytics) return;

    const body = JSON.stringify({ path: pathname, deviceType: detectDeviceType() });
    fetch("/api/public/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname, prefs]);

  return null;
}
