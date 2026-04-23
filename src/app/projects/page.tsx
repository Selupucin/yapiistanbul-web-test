import { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";
import { ProjectVisitLink } from "@/components/project-visit-link";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { localizedName } from "@/lib/content";
import { getLang, t } from "@/lib/i18n";
import { safeProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Yapi Istanbul projeleri",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const lang = await getLang();
  const projects = await safeProjects();

  return (
    <SiteShell>
      <PageSeoSchema
        title={t(lang, "Projeler", "Projects")}
        description={t(lang, "Yapı İstanbul proje portföyünü inceleyin.", "Explore Yapi Istanbul's project portfolio.")}
        path="/projects"
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "Projeler", "Projects"), path: "/projects" },
        ]}
      />

      <Breadcrumb homeLabel={t(lang, "Ana Sayfa", "Home")} items={[{ href: "/projects", label: t(lang, "Projeler", "Projects") }]} />

      <section className="animate-fade-up rounded-3xl navy-gradient p-8 text-white sm:p-10">
        <h1 className="text-4xl sm:text-5xl">{t(lang, "Projeler", "Projects")}</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
          {t(lang, "Konut, karma kullanım ve ticari odaklı geliştirmelerden oluşan portföyümüz; net, güçlü ve lokasyonla uyumlu projelerden oluşur.", "Our portfolio spans residential, mixed-use, and commercial developments shaped by location and long-term value.")}
        </p>
      </section>

      <section className="animate-fade-up-delayed mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            title: t(lang, "Seçim Kriteri", "Selection Criteria"),
            text: t(lang, "Projeleri lokasyon gücü, kullanım değeri ve uzun vadeli potansiyeline göre değerlendiriyoruz.", "We evaluate projects by location strength, usability, and long-term potential."),
          },
          {
            title: t(lang, "Portföy Yapısı", "Portfolio Structure"),
            text: t(lang, "Konut, karma kullanım ve ticari odaklı farklı yatırım senaryolarını birlikte sunuyoruz.", "We present residential, mixed-use, and commercial scenarios together."),
          },
          {
            title: t(lang, "Erişim", "Access"),
            text: t(lang, "Her proje kartından ilgili proje sitesine doğrudan geçiş sağlayabilirsiniz.", "Each project card provides direct access to its dedicated project site."),
          },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#dce7f8] bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-semibold text-[#0c2c64]">{item.title}</p>
            <p className="mt-2 text-sm text-[#4c6790]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article key={String(project._id)} className="panel-soft overflow-hidden rounded-2xl p-0">
              <div className="relative h-40 w-full">
                <Image
                  src={
                    index % 2 === 0
                      ? "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1000&q=85"
                      : "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1000&q=85"
                  }
                  alt={project.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
              <p className="text-xs tracking-widest text-[#6f84a8]">{t(lang, "YAPI İSTANBUL PROJESİ", "YAPI ISTANBUL PROJECT")}</p>
              <h2 className="mt-2 text-xl section-title">{localizedName(project, lang)}</h2>
              <p className="mt-3 text-sm text-[#5f7395]">
                {t(lang, "Proje detayları ayrı alt domainde yayınlanır. Aşağıdaki bağlantı ile proje sitesine doğrudan erişebilirsiniz.", "Project details are published on a dedicated subdomain. Use the link below to access the project website directly.")}
              </p>
              <ProjectVisitLink
                href={project.link}
                projectName={localizedName(project, lang)}
                className="btn-hover mt-4 inline-block rounded-full navy-gradient px-5 py-2 text-sm font-semibold text-white"
              >
                {t(lang, "Proje sitesine git", "Visit project site")}
              </ProjectVisitLink>
              </div>
            </article>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="panel-soft rounded-2xl p-6 text-sm text-[#5c7092]">
            {t(lang, "Henüz proje kaydı eklenmedi. Admin panelinden yeni proje ekleyebilirsiniz.", "No projects have been added yet. You can add a new project from the admin panel.")}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-3xl border border-[#dbe7f8] bg-[#f8fbff] p-7">
        <h2 className="text-3xl section-title">{t(lang, "Portföy Değerlendirme Yaklaşımı", "Portfolio Evaluation Approach")}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#dfebfb] bg-white p-4 text-sm text-[#5a6f92]">
            {t(lang, "Pazar ihtiyacı ve lokasyon bağlantıları", "Market demand and location connectivity")}
          </div>
          <div className="rounded-2xl border border-[#dfebfb] bg-white p-4 text-sm text-[#5a6f92]">
            {t(lang, "Mimari kalite, teknik uygulanabilirlik ve maliyet dengesi", "Architectural quality, technical feasibility, and cost balance")}
          </div>
          <div className="rounded-2xl border border-[#dfebfb] bg-white p-4 text-sm text-[#5a6f92]">
            {t(lang, "Uzun vadeli kullanım değeri ve yatırım geri dönüşü", "Long-term usability value and investment return")}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
