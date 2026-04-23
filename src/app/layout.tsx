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
      default: "Yapı İstanbul",
      template: "%s | Yapı İstanbul",
    },
    description: "Yapı İstanbul — İstanbul odaklı premium konut ve ticari proje geliştirme firması.",
    keywords: [
      "Yapı İstanbul",
      "inşaat firması",
      "istanbul projeleri",
      "kentsel proje geliştirme",
      "premium konut",
    ],
    alternates: {
      canonical: "/",
    },
    icons: settings.siteFavicon ? { icon: settings.siteFavicon } : undefined,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Yapı İstanbul",
      title: "Yapı İstanbul",
      description: "İstanbul odaklı premium konut ve ticari proje geliştirme firması.",
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: "Yapı İstanbul",
      description: "İstanbul odaklı premium konut ve ticari proje geliştirme firması.",
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
