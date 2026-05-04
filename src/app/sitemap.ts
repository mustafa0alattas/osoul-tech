import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

const ENTRIES: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/register-interest", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shariah", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/risks", priority: 0.4, changeFrequency: "yearly" },
];

function urlFor(locale: string, path: string) {
  const trimmed = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${trimmed}`;
}

function hreflangFor(locale: string) {
  return locale === "ar" ? "ar-SA" : locale;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const items: MetadataRoute.Sitemap = [];

  for (const entry of ENTRIES) {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
      languages[hreflangFor(l)] = urlFor(l, entry.path);
    }
    languages["x-default"] = urlFor(routing.defaultLocale, entry.path);

    for (const locale of routing.locales) {
      items.push({
        url: urlFor(locale, entry.path),
        lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: { languages },
      });
    }
  }

  return items;
}
