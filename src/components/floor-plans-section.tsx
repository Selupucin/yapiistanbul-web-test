"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type FloorPlan = { label: string; image: string };

export function FloorPlansSection({
  plans,
  title,
  selectLabel,
  emptyLabel,
}: {
  plans: FloorPlan[];
  title: string;
  selectLabel: string;
  emptyLabel: string;
}) {
  const [selected, setSelected] = useState<string>(plans[0]?.label || "");
  const [zoomed, setZoomed] = useState(false);
  const [aspect, setAspect] = useState<number>(4 / 3);

  useEffect(() => {
    if (!plans.length) return;
    if (!plans.find((p) => p.label === selected)) {
      setSelected(plans[0].label);
    }
  }, [plans, selected]);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

  if (!plans || plans.length === 0) {
    return (
      <div className="rounded-3xl border border-[#dbe7fa] bg-white p-5 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
        <h3 className="text-base font-semibold text-[#0c2c64]">{title}</h3>
        <p className="mt-3 text-sm text-[#6f84a8]">{emptyLabel}</p>
      </div>
    );
  }

  const active = plans.find((p) => p.label === selected) || plans[0];

  return (
    <div className="rounded-3xl border border-[#dbe7fa] bg-white p-5 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-[#0c2c64]">{title}</h3>
        <label className="flex items-center gap-2 text-xs text-[#6f84a8]">
          <span>{selectLabel}</span>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-lg border border-[#cdd9ee] bg-white px-2 py-1 text-xs font-semibold text-[#0c2c64] focus:outline-none focus:ring-2 focus:ring-[#1a4f9d]/30"
          >
            {plans.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="group relative mt-4 block w-full overflow-hidden rounded-2xl border border-[#e5edf9] bg-white transition hover:border-[#1a4f9d]"
        style={{ aspectRatio: String(aspect) }}
        aria-label={`${active.label} — büyüt`}
      >
        <Image
          key={active.label}
          src={active.image}
          alt={`Kat planı — ${active.label}`}
          fill
          sizes="(min-width: 1024px) 35vw, 100vw"
          unoptimized={active.image.startsWith("data:")}
          onLoad={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.naturalWidth && img.naturalHeight) {
              setAspect(img.naturalWidth / img.naturalHeight);
            }
          }}
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-[#0c2c64] opacity-0 backdrop-blur transition group-hover:opacity-100">
          ⛶ Büyüt
        </span>
      </button>

      <p className="mt-2 text-center text-[11px] font-semibold tracking-wide text-[#0c2c64]">
        {active.label}
      </p>

      {zoomed ? (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-4"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-xl font-bold text-[#0c2c64] hover:bg-white"
            aria-label="Kapat"
          >
            ×
          </button>

          {plans.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = plans.findIndex((p) => p.label === active.label);
                  setSelected(plans[(idx - 1 + plans.length) % plans.length].label);
                }}
                className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl font-bold text-[#0c2c64] hover:bg-white"
                aria-label="Önceki kat"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = plans.findIndex((p) => p.label === active.label);
                  setSelected(plans[(idx + 1) % plans.length].label);
                }}
                className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl font-bold text-[#0c2c64] hover:bg-white"
                aria-label="Sonraki kat"
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="relative flex h-[85vh] w-[92vw] max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.image}
              alt={`Kat planı — ${active.label}`}
              fill
              sizes="92vw"
              unoptimized={active.image.startsWith("data:")}
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#0c2c64] backdrop-blur">
            {active.label}
          </p>
        </div>
      ) : null}
    </div>
  );
}

