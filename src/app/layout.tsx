import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { getLang } from "@/lib/i18n";
import { safeSettings } from "@/lib/data";
import "./globals.css";

const titleFont = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await safeSettings();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com"),
    title: {
      default: "Yapi Istanbul",
      template: "%s | Yapi Istanbul",
    },
    description: "Yapi Istanbul premium residential and commercial project development firm.",
    keywords: [
      "Yapi Istanbul",
      "insaat firmasi",
      "istanbul projeleri",
      "kentsel proje gelistirme",
      "premium konut",
    ],
    alternates: {
      canonical: "/",
    },
    icons: settings.siteFavicon ? { icon: settings.siteFavicon } : undefined,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Yapi Istanbul",
      title: "Yapi Istanbul",
      description: "Istanbul odakli premium konut ve ticari proje gelistirme firmasi.",
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: "Yapi Istanbul",
      description: "Istanbul odakli premium konut ve ticari proje gelistirme firmasi.",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html
      lang={lang}
      className={`${titleFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
