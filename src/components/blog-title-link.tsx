import Link from "next/link";

export function BlogTitleLink({ href, title, meta }: { href: string; title: string; meta: string }) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-[#d7e4f8] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[#b8cff1] hover:shadow-[0_18px_40px_rgba(12,44,100,0.10)]"
    >
      <p className="font-semibold text-[#11346f] transition group-hover:text-[#0c2c64]">{title}</p>
      <p className="mt-1 text-xs text-[#6c7fa1]">{meta}</p>
    </Link>
  );
}
