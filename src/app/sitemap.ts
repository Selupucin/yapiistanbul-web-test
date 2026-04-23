import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com";
  const now = new Date();
  const routes: Array<{ path: string; freq: "daily" | "weekly" | "monthly"; priority: number }> = [
    { path: "", freq: "daily", priority: 1 },
    { path: "/about", freq: "monthly", priority: 0.7 },
    { path: "/projects", freq: "weekly", priority: 0.9 },
    { path: "/blog", freq: "weekly", priority: 0.85 },
    { path: "/contact", freq: "monthly", priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
