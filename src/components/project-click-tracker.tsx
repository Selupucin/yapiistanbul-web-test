"use client";

import { useEffect } from "react";

function detectDeviceType(): "mobile" | "desktop" | "tablet" {
  const ua = (typeof navigator !== "undefined" ? navigator.userAgent : "").toLowerCase();
  const touch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 1;
  if (/ipad|tablet/.test(ua) || (touch && /macintosh/.test(ua))) return "tablet";
  if (/iphone|android|mobile|mobi/.test(ua)) return "mobile";
  return "desktop";
}

/** Proje detay sayfası açıldığında, ilgili projeyi tıklama olarak işaretler. */
export function ProjectClickTracker({
  projectName,
  slug,
}: {
  projectName: string;
  slug: string;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Aynı sekmede tekrarlı sayımı engelle (ör. tab geçişi useEffect'i tetiklemez ama
    // soft navigation döngüsünü kırmak için sessionStorage kullanıyoruz).
    const key = `pc:${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    const body = JSON.stringify({
      projectName,
      path: `/projects/${slug}`,
      deviceType: detectDeviceType(),
    });
    fetch("/api/public/analytics/project-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  }, [projectName, slug]);

  return null;
}
