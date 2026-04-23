import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-3xl rounded-3xl border border-[#d8e5f8] bg-white p-10 text-center shadow-[0_18px_40px_rgba(12,44,100,0.10)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5f79a3]">404</p>
          <h1 className="mt-3 text-4xl font-bold text-[#0c2c64] sm:text-5xl">Aradığınız sayfa bulunamadı</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#607396] sm:text-base">
            Ulaşmaya çalıştığınız içerik taşınmış, kaldırılmış veya yanlış bir bağlantıyla açılmış olabilir.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="rounded-full bg-[#0c2c64] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123a7f]">
              Ana Sayfaya Dön
            </Link>
            <Link href="/contact" className="rounded-full border border-[#cddcf3] px-6 py-3 text-sm font-semibold text-[#0c2c64] transition hover:bg-[#f4f8ff]">
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}