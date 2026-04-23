import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listProjects } from "@repo/api";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { SiteShell } from "@/components/site-shell";
import { ProjectVisitLink } from "@/components/project-visit-link";
import { localizedName } from "@/lib/content";
import { dateLocale, getLang, t } from "@/lib/i18n";
import { slugify } from "@/lib/slug";

async function findProjectBySlug(slug: string) {
  try {
    const all = await listProjects();
    return all.find((p) => slugify(p.name) === slug || slugify(p.nameEn || "") === slug) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  context: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await context.params;
  const project = await findProjectBySlug(slug);
  if (!project) return { title: "Proje" };
  return {
    title: project.name,
    description: `${project.name} — Yapı İstanbul tarafından geliştirilen proje detayları.`,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectDetailPage(
  context: { params: Promise<{ slug: string }> }
) {
  const lang = await getLang();
  const { slug } = await context.params;
  const project = await findProjectBySlug(slug);
  if (!project) notFound();

  const name = localizedName(project, lang);
  const heroImage = "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1800&q=85";

  return (
    <SiteShell>
      <PageSeoSchema
        title={name}
        description={t(
          lang,
          `${name} — Yapı İstanbul tarafından geliştirilen proje hakkında detaylar.`,
          `${name} — details about the project developed by Yapı İstanbul.`
        )}
        path={`/projects/${slug}`}
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: t(lang, "Projeler", "Projects"), path: "/projects" },
          { name, path: `/projects/${slug}` },
        ]}
      />

      <Breadcrumb
        homeLabel={t(lang, "Ana Sayfa", "Home")}
        items={[
          { href: "/projects", label: t(lang, "Projeler", "Projects") },
          { href: `/projects/${slug}`, label: name },
        ]}
      />

      <article className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-3xl border border-[#cfddf4] shadow-[0_18px_40px_rgba(10,44,100,0.14)]">
          <div className="relative h-[320px] sm:h-[420px]">
            <Image
              src={heroImage}
              alt={`${name} — Yapı İstanbul projesi`}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,44,0.18)_0%,rgba(8,30,74,0.6)_55%,rgba(8,30,74,0.92)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                {t(lang, "YAPI İSTANBUL PROJESİ", "YAPI ISTANBUL PROJECT")}
              </p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{name}</h1>
              {project.createdAt ? (
                <p className="mt-2 text-sm text-white/80">
                  {new Date(project.createdAt).toLocaleDateString(dateLocale(lang))}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-[#dbe7fa] bg-white p-7 shadow-[0_14px_30px_rgba(10,44,100,0.08)]">
            <h2 className="text-2xl section-title">{t(lang, "Proje Hakkında", "About the Project")}</h2>
            <p className="mt-3 leading-7 text-[#46638f]">
              {t(
                lang,
                `${name}, Yapı İstanbul'un planlama, tasarım ve uygulama disiplinlerini bir arada yürüttüğü projelerden biridir. Detaylı bilgi ve güncel görseller için proje sitesini ziyaret edebilirsiniz.`,
                `${name} is one of the projects where Yapı İstanbul integrates planning, design, and execution. Visit the dedicated project site for detailed information and the latest visuals.`
              )}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="rounded-2xl border border-[#e2ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-[#46638f]">
                <span className="font-semibold text-[#0c2c64]">{t(lang, "Konum", "Location")}:</span>{" "}
                {t(lang, "İstanbul", "Istanbul")}
              </li>
              <li className="rounded-2xl border border-[#e2ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-[#46638f]">
                <span className="font-semibold text-[#0c2c64]">{t(lang, "Geliştirici", "Developer")}:</span> Yapı İstanbul
              </li>
            </ul>
          </div>

          <aside className="rounded-3xl navy-gradient p-7 text-white shadow-[0_14px_30px_rgba(10,44,100,0.18)]">
            <h2 className="text-2xl">{t(lang, "Proje Bağlantıları", "Project Links")}</h2>
            <p className="mt-3 text-sm text-white/85">
              {t(
                lang,
                "Detaylı görseller, satış ve teknik bilgiler için proje sitesini ziyaret edebilirsiniz.",
                "Visit the project site for detailed visuals, sales and technical information."
              )}
            </p>
            <ProjectVisitLink
              href={project.link}
              projectName={name}
              className="btn-hover mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0c2c64] hover:bg-[#eaf2ff]"
            >
              {t(lang, "Proje sitesine git", "Visit project site")}
            </ProjectVisitLink>
            <Link
              href="/contact"
              className="btn-hover mt-3 inline-block rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t(lang, "Bilgi Al", "Get Information")}
            </Link>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl border border-[#dbe7f8] bg-[#f8fbff] p-7">
          <h2 className="text-2xl section-title">{t(lang, "Diğer Projeler", "Other Projects")}</h2>
          <Link
            href="/projects"
            className="mt-4 inline-block rounded-full border border-[#c5d8f5] px-5 py-2 text-sm font-semibold text-[#0c2c64] hover:bg-[#edf4ff]"
          >
            {t(lang, "Tüm projeleri gör", "View all projects")}
          </Link>
        </section>
      </article>
    </SiteShell>
  );
}
