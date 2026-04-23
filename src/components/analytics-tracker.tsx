"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function detectDeviceType(): "mobile" | "desktop" | "tablet" {
  const ua = (typeof navigator !== "undefined" ? navigator.userAgent : "").toLowerCase();
  const touch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 1;

  if (/ipad|tablet/.test(ua) || (touch && /macintosh/.test(ua))) return "tablet";
  if (/iphone|android|mobile|mobi/.test(ua)) return "mobile";
  return "desktop";
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const body = JSON.stringify({ path: pathname, deviceType: detectDeviceType() });
    fetch("/api/public/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
