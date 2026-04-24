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

  useEffect(() => {
    if (!plans.length) return;
    if (!plans.find((p) => p.label === selected)) {
      setSelected(plans[0].label);
    }
  }, [plans, selected]);

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

      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#e5edf9] bg-[#f8fbff]">
        <Image
          key={active.label}
          src={active.image}
          alt={`Kat planı — ${active.label}`}
          fill
          sizes="(min-width: 1024px) 35vw, 100vw"
          unoptimized={active.image.startsWith("data:")}
          className="object-contain"
        />
      </div>

      <p className="mt-2 text-center text-[11px] font-semibold tracking-wide text-[#0c2c64]">
        {active.label}
      </p>
    </div>
  );
}
