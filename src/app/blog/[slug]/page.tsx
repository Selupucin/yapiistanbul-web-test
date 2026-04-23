import { getBlogBySlug } from "@repo/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageSeoSchema } from "@/components/page-seo-schema";
import { SiteShell } from "@/components/site-shell";
import { localizedContent, localizedTitle } from "@/lib/content";
import { dateLocale, getLang, t } from "@/lib/i18n";

export async function generateMetadata(
  context: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await context.params;
  const blog = await getBlogBySlug(slug).catch(() => null);
  if (!blog) {
    return { title: "Blog" };
  }

  return {
    title: blog.title,
    description: blog.content.slice(0, 150),
  };
}

export default async function BlogDetailPage(
  context: { params: Promise<{ slug: string }> }
) {
  const lang = await getLang();
  const { slug } = await context.params;
  const blog = await getBlogBySlug(slug).catch(() => null);

  if (!blog) notFound();

  return (
    <SiteShell>
      <PageSeoSchema
        title={localizedTitle(blog, lang)}
        description={localizedContent(blog, lang).slice(0, 150)}
        path={`/blog/${blog.slug}`}
        breadcrumbs={[
          { name: t(lang, "Ana Sayfa", "Home"), path: "/" },
          { name: "Blog", path: "/blog" },
          { name: localizedTitle(blog, lang), path: `/blog/${blog.slug}` },
        ]}
      />

      <Breadcrumb
        homeLabel={t(lang, "Ana Sayfa", "Home")}
        items={[
          { href: "/blog", label: "Blog" },
          { href: `/blog/${blog.slug}`, label: localizedTitle(blog, lang) },
        ]}
      />

      <article className="mx-auto max-w-4xl rounded-3xl border border-[#dbe7fa] bg-white p-8 shadow-[0_16px_35px_rgba(11,45,101,0.10)] sm:p-10">
        {!!blog.coverImage && (
          <div className="relative mb-6 h-72 overflow-hidden rounded-2xl border border-[#dbe7fa] sm:h-96">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <p className="text-xs text-[#6f84a7]">{new Date(blog.createdAt).toLocaleDateString(dateLocale(lang))}</p>
        <h1 className="mt-3 text-4xl section-title sm:text-5xl">{localizedTitle(blog, lang)}</h1>
        <div className="mt-6 h-px w-full bg-[#e1ebfa]" />
        <div className="mt-6 max-w-none whitespace-pre-wrap text-base leading-8 text-[#2f4772]">{localizedContent(blog, lang)}</div>
        <div className="mt-8">
          <Link href="/blog" className="btn-hover inline-block rounded-full border border-[#c5d8f5] px-4 py-2 text-sm font-semibold text-[#0d3370] hover:bg-[#edf4ff]">
            {t(lang, "Blog'a dön", "Back to blog")}
          </Link>
        </div>
      </article>
    </SiteShell>
  );
}
