import { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { getLang, t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Hakkimizda",
  description: "Yapi Istanbul hakkinda bilgi",
};

export default async function AboutPage() {
  const lang = await getLang();

  return (
    <SiteShell>
      <PageSeoSchema
        title={t(lang, "Hakkımızda", "About")}
        description={t(lang, "Yapı İstanbul'un vizyonu, misyonu ve çalışma modeli.", "Yapi Istanbul's vision, mission, and way of working.")}
        path="/about"
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "Hakkımızda", "About"), path: "/about" },
        ]}
      />

      <Breadcrumb homeLabel={t(lang, "Ana Sayfa", "Home")} items={[{ href: "/about", label: t(lang, "Hakkımızda", "About") }]} />

      <section className="animate-fade-up rounded-3xl border border-[#d8e5f8] bg-white p-8 shadow-[0_16px_36px_rgba(12,44,100,0.09)] sm:p-10">
        <h1 className="text-4xl section-title sm:text-5xl">{t(lang, "Hakkımızda", "About")}</h1>
        <p className="mt-4 max-w-3xl text-sm text-[#607396] sm:text-base">
          {t(
            lang,
            "Yapı İstanbul, İstanbul odaklı konut ve ticari proje geliştirme alanında planlama, tasarım, uygulama ve teslim sonrası süreçleri birlikte yöneten bütünleşik bir yapıdır.",
            "Yapi Istanbul is an integrated structure that manages planning, design, execution, and post-delivery processes for Istanbul-focused residential and commercial developments."
          )}
        </p>
      </section>

      <section className="animate-fade-up-delayed mt-6 grid gap-3 sm:grid-cols-4">
        {[
          {
            title: t(lang, "Deneyim", "Experience"),
            text: t(lang, "2009'dan bu yana farklı ölçeklerde proje geliştirme birikimi.", "Project development experience across different scales since 2009."),
          },
          {
            title: t(lang, "Yaşam Senaryosu", "Life Scenario"),
            text: t(lang, "İnsan akışını ve günlük kullanımı merkez alan mekan kararları.", "Spatial decisions centered on human flow and daily use."),
          },
          {
            title: t(lang, "Sürdürülebilirlik", "Sustainability"),
            text: t(lang, "Malzeme, enerji ve işletme verimliliğini birlikte ele alan yaklaşım.", "An approach that handles materials, energy, and operational efficiency together."),
          },
          {
            title: t(lang, "Yönetim Disiplini", "Management Discipline"),
            text: t(lang, "Planlama, tasarım ve uygulamayı tek yapı altında koordine eden sistem.", "A system coordinating planning, design, and execution under one structure."),
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#dbe6f8] bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-semibold text-[#0c2c64]">{item.title}</p>
            <p className="mt-2 text-sm text-[#46638f]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-5 text-center">
          <h2 className="text-3xl section-title sm:text-4xl">{t(lang, "Vizyon, Misyon ve Değerler", "Vision, Mission and Values")}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-[#5f7394] sm:text-base">
            {t(lang, "Yapı İstanbul'un temel yaklaşımını, görsel atmosferle bütünleşen güçlü bir anlatımda bir araya getiriyoruz.", "We bring together Yapi Istanbul's core approach in a strong narrative integrated with visual atmosphere.")}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: t(lang, "Vizyon", "Vision"),
              text: t(lang, "Geleceğin kent dokusuna uyumlu, yüksek standartlı yaşam alanları tasarlamak.", "Design high-standard living spaces aligned with the urban fabric of the future."),
              image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&q=85",
            },
            {
              title: t(lang, "Misyon", "Mission"),
              text: t(lang, "Teknik kalite ve estetik dengesiyle güvenilir proje teslimi sunmak.", "Deliver reliable projects with a balanced approach to technical quality and aesthetics."),
              image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1200&q=85",
            },
            {
              title: t(lang, "Değerler", "Values"),
              text: t(lang, "Şeffaflık, güvenlik, sürdürülebilirlik ve insan odaklı yaklaşım.", "Transparency, safety, sustainability, and a human-focused mindset."),
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
            },
          ].map((item) => (
            <article key={item.title} className="group relative min-h-80 overflow-hidden rounded-3xl border border-[#cfddf4] shadow-[0_14px_30px_rgba(10,44,100,0.14)]">
              <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,44,0.18)_0%,rgba(8,30,74,0.6)_45%,rgba(8,30,74,0.9)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Yapı İstanbul</p>
                <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/90">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-[#dce7fa] bg-white p-7 shadow-[0_14px_34px_rgba(10,44,100,0.08)]">
        <h2 className="text-3xl section-title">{t(lang, "Çalışma Modelimiz", "Our Working Model")}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e2ecfb] bg-[#f8fbff] p-5">
            <p className="text-lg font-semibold text-[#123f80]">{t(lang, "1. Arsa ve Potansiyel Analizi", "1. Land and Potential Analysis")}</p>
            <p className="mt-2 text-sm text-[#617596]">
              {t(lang, "Lokasyon, ulaşım, sosyo-ekonomik veri ve hedef kitle beklentileri bir arada değerlendirilir.", "Location, transport, socio-economic data, and target audience expectations are evaluated together.")}
            </p>
          </div>
          <div className="rounded-2xl border border-[#e2ecfb] bg-[#f8fbff] p-5">
            <p className="text-lg font-semibold text-[#123f80]">{t(lang, "2. Tasarım ve Projelendirme", "2. Design and Planning")}</p>
            <p className="mt-2 text-sm text-[#617596]">
              {t(lang, "Mimari konsept, statik ve mekanik gereksinimlerle entegre biçimde oluşturulur.", "The architectural concept is created in integration with structural and mechanical requirements.")}
            </p>
          </div>
          <div className="rounded-2xl border border-[#e2ecfb] bg-[#f8fbff] p-5">
            <p className="text-lg font-semibold text-[#123f80]">{t(lang, "3. Uygulama ve Denetim", "3. Execution and Supervision")}</p>
            <p className="mt-2 text-sm text-[#617596]">
              {t(lang, "Şantiye faaliyetleri kalite güvence ve zaman planı odaklı denetimle ilerletilir.", "Site activities progress through supervision focused on quality assurance and timeline discipline.")}
            </p>
          </div>
          <div className="rounded-2xl border border-[#e2ecfb] bg-[#f8fbff] p-5">
            <p className="text-lg font-semibold text-[#123f80]">{t(lang, "4. Teslim ve Destek", "4. Delivery and Support")}</p>
            <p className="mt-2 text-sm text-[#617596]">
              {t(lang, "Teslim sonrası teknik destek ve kurumsal iletişim süreci sistematik olarak sürdürülür.", "Post-delivery technical support and communication are maintained systematically.")}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <article className="panel-soft rounded-3xl p-7">
          <h2 className="text-3xl section-title">{t(lang, "Tasarım Felsefemiz", "Our Design Philosophy")}</h2>
          <p className="mt-3 text-sm text-[#5f7394]">
            {t(lang, "Mimari dilde estetik kadar işlevselliği; pazarlama sürecinde de sadece bugünü değil, yapının 10-20 yıllık değerini merkeze alıyoruz.", "In architecture, we value functionality as much as aesthetics, and in development strategy we focus on long-term value, not only immediate outcomes.")}
          </p>
        </article>

        <article className="rounded-3xl navy-gradient p-7 text-white">
          <h2 className="text-3xl">{t(lang, "Birlikte Çalışalım", "Let's Work Together")}</h2>
          <p className="mt-3 text-sm text-white/90">
            {t(lang, "Arsa değerlendirme, proje stratejisi veya yatırım fizibilitesi için uzman ekibimizle görüşme oluşturabilirsiniz.", "You can schedule a meeting with our team for land evaluation, project strategy, or investment feasibility.")}
          </p>
          <a href="/contact" className="btn-hover mt-5 inline-block rounded-full border border-white/35 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10">
            {t(lang, "İletişime Geç", "Contact Us")}
          </a>
        </article>
      </section>
    </SiteShell>
  );
}
