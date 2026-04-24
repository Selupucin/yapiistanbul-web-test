"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
  initialIndex?: number;
};

export function ProjectGallery({ images, alt, initialIndex = 0 }: Props) {
  const safe = images.filter(Boolean);
  const [active, setActive] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(safe.length - 1, 0))
  );
  const [lightbox, setLightbox] = useState(false);

  if (safe.length === 0) return null;

  const current = safe[active] || safe[0];

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#dbe7fa] bg-slate-100 shadow-[0_14px_30px_rgba(10,44,100,0.1)] transition hover:shadow-[0_18px_36px_rgba(10,44,100,0.18)]"
          aria-label="Görseli büyüt"
        >
          <Image
            src={current}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition duration-500 hover:scale-105"
            priority
          />
        </button>

        {safe.length > 1 ? (
          <div className="grid grid-cols-3 gap-2">
            {safe.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                  active === idx
                    ? "border-[#0c2c64] ring-2 ring-[#1a4f9d]/30"
                    : "border-transparent hover:border-[#cfddf4]"
                }`}
                aria-label={`Görsel ${idx + 1}`}
                aria-current={active === idx}
              >
                <Image
                  src={img}
                  alt={`${alt} - ${idx + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-4"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Görsel önizleme"
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full bg-white/15 p-2 text-white transition hover:bg-white/30"
            aria-label="Kapat"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="relative h-[80vh] w-[90vw]">
            <Image src={current} alt={alt} fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
