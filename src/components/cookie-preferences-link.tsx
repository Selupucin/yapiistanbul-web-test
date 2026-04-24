"use client";

export function CookiePreferencesLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="link-hover text-left"
      onClick={() => window.dispatchEvent(new CustomEvent("yi:open-cookie-prefs"))}
    >
      {label}
    </button>
  );
}
