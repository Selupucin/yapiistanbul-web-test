"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteLang } from "@/lib/i18n";

const COOKIE_NAME = "yi_cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  v: 1;
  ts: number;
  prefs: CookiePreferences;
};

function readConsent(): StoredConsent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    const raw = decodeURIComponent(match.split("=")[1] || "");
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed && parsed.v === 1 && parsed.prefs) return parsed;
    return null;
  } catch {
    return null;
  }
}

function writeConsent(prefs: CookiePreferences) {
  if (typeof document === "undefined") return;
  const data: StoredConsent = { v: 1, ts: Date.now(), prefs };
  const value = encodeURIComponent(JSON.stringify(data));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("yi:consent-change", { detail: prefs }));
}

export function getCookiePreferences(): CookiePreferences | null {
  return readConsent()?.prefs ?? null;
}

const LABELS = {
  tr: {
    title: "Çerez Tercihleriniz",
    desc: "Web sitemizde size daha iyi bir deneyim sunmak, içerikleri kişiselleştirmek ve trafiği analiz etmek için çerezler kullanıyoruz. Tercihinizi istediğiniz zaman güncelleyebilirsiniz.",
    accept: "Tümünü Kabul Et",
    reject: "Tümünü Reddet",
    manage: "Tercihleri Yönet",
    save: "Seçimimi Kaydet",
    close: "Kapat",
    policy: "Çerez Politikası",
    necessary: "Zorunlu Çerezler",
    necessaryDesc: "Sitenin temel işlevleri için gereklidir ve devre dışı bırakılamaz.",
    analytics: "Analitik Çerezler",
    analyticsDesc: "Ziyaret istatistiklerini anonim olarak ölçmemize yardımcı olur.",
    marketing: "Pazarlama Çerezleri",
    marketingDesc: "Reklam ve içerik tercihlerinizi kişiselleştirmek için kullanılır.",
    always: "Her zaman aktif",
  },
  en: {
    title: "Your Cookie Preferences",
    desc: "We use cookies to improve your experience, personalize content and analyze traffic on our site. You can update your preferences at any time.",
    accept: "Accept All",
    reject: "Reject All",
    manage: "Manage Preferences",
    save: "Save My Choices",
    close: "Close",
    policy: "Cookie Policy",
    necessary: "Strictly Necessary",
    necessaryDesc: "Required for core site functionality and cannot be disabled.",
    analytics: "Analytics Cookies",
    analyticsDesc: "Help us measure visitor statistics anonymously.",
    marketing: "Marketing Cookies",
    marketingDesc: "Used to personalize ads and content recommendations.",
    always: "Always active",
  },
} as const;

export function CookieConsent({ lang }: { lang: SiteLang }) {
  const L = LABELS[lang];
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = readConsent();
    if (!existing) {
      // küçük gecikme: LCP/CLS'i etkilememek için
      const id = window.setTimeout(() => setVisible(true), 400);
      return () => window.clearTimeout(id);
    }
    setAnalytics(existing.prefs.analytics);
    setMarketing(existing.prefs.marketing);
  }, []);

  useEffect(() => {
    const handler = () => {
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener("yi:open-cookie-prefs", handler);
    return () => window.removeEventListener("yi:open-cookie-prefs", handler);
  }, []);

  if (!mounted || !visible) return null;

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
    setShowPrefs(false);
  };
  const rejectAll = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
    setShowPrefs(false);
  };
  const saveChoice = () => {
    writeConsent({ necessary: true, analytics, marketing });
    setVisible(false);
    setShowPrefs(false);
  };

  return (
    <>
      {showPrefs ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
          className="fixed inset-0 z-100 flex items-end justify-center bg-[#0b1f43]/55 px-4 py-6 backdrop-blur-sm sm:items-center"
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-[#d8e5f8] bg-white shadow-[0_24px_60px_rgba(12,44,100,0.25)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#eef2f9] px-6 py-4">
              <h2 id="cookie-prefs-title" className="text-lg font-semibold text-[#0c2c64]">
                {L.title}
              </h2>
              <button
                type="button"
                aria-label={L.close}
                onClick={() => setShowPrefs(false)}
                className="rounded-full p-1 text-[#4f6080] transition hover:bg-[#eef4ff] hover:text-[#0c2c64]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-5 text-sm text-[#3b4a6b]">
              <p>{L.desc}</p>

              <PrefRow
                title={L.necessary}
                desc={L.necessaryDesc}
                checked
                disabled
                badge={L.always}
              />
              <PrefRow
                title={L.analytics}
                desc={L.analyticsDesc}
                checked={analytics}
                onChange={setAnalytics}
              />
              <PrefRow
                title={L.marketing}
                desc={L.marketingDesc}
                checked={marketing}
                onChange={setMarketing}
              />

              <Link
                href="/cookies-policy"
                className="inline-block text-xs font-semibold text-[#1a4f9d] underline-offset-2 hover:underline"
              >
                {L.policy}
              </Link>
            </div>

            <div className="flex flex-col gap-2 border-t border-[#eef2f9] bg-[#f7faff] px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-[#cfd9ec] bg-white px-4 py-2 text-sm font-semibold text-[#0c2c64] transition hover:border-[#1a4f9d] hover:bg-[#eef4ff]"
              >
                {L.reject}
              </button>
              <button
                type="button"
                onClick={saveChoice}
                className="rounded-full border border-[#0c2c64] bg-white px-4 py-2 text-sm font-semibold text-[#0c2c64] transition hover:bg-[#eef4ff]"
              >
                {L.save}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full border border-[#0c2c64] bg-[#0c2c64] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a4f9d]"
              >
                {L.accept}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          role="region"
          aria-label={L.title}
          className="fixed inset-x-0 bottom-0 z-90 px-3 pb-3 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-[#d8e5f8] bg-white/95 p-4 shadow-[0_18px_40px_rgba(12,44,100,0.18)] backdrop-blur sm:flex-row sm:items-center sm:gap-6 sm:p-5">
            <div className="flex-1 text-sm text-[#3b4a6b]">
              <p className="mb-1 text-base font-semibold text-[#0c2c64]">{L.title}</p>
              <p className="leading-relaxed">
                {L.desc}{" "}
                <Link
                  href="/cookies-policy"
                  className="font-semibold text-[#1a4f9d] underline-offset-2 hover:underline"
                >
                  {L.policy}
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="rounded-full border border-[#cfd9ec] bg-white px-4 py-2 text-sm font-semibold text-[#0c2c64] transition hover:border-[#1a4f9d] hover:bg-[#eef4ff]"
              >
                {L.manage}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-[#cfd9ec] bg-white px-4 py-2 text-sm font-semibold text-[#0c2c64] transition hover:border-[#1a4f9d] hover:bg-[#eef4ff]"
              >
                {L.reject}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full border border-[#0c2c64] bg-[#0c2c64] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a4f9d]"
              >
                {L.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  onChange,
  disabled,
  badge,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-[#eef2f9] bg-[#f9fbff] px-4 py-3">
      <div className="flex-1">
        <p className="text-sm font-semibold text-[#0c2c64]">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-[#5a6a86]">{desc}</p>
      </div>
      {disabled ? (
        <span className="shrink-0 rounded-full bg-[#eef4ff] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1a4f9d]">
          {badge}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange?.(!checked)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            checked ? "bg-[#1a4f9d]" : "bg-[#cfd9ec]"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      )}
    </div>
  );
}
