import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://osoul.tech";

export const SEO_PAGE_KEYS = [
  "home",
  "about",
  "howItWorks",
  "shariah",
  "faq",
  "contact",
  "registerInterest",
  "privacy",
  "terms",
  "risks",
] as const;

export type SeoPageKey = (typeof SEO_PAGE_KEYS)[number];

const PATH_BY_KEY: Record<SeoPageKey, string> = {
  home: "/",
  about: "/about",
  howItWorks: "/how-it-works",
  shariah: "/shariah",
  faq: "/faq",
  contact: "/contact",
  registerInterest: "/register-interest",
  privacy: "/privacy",
  terms: "/terms",
  risks: "/risks",
};

const OG_LOCALE_BY_LOCALE: Record<string, string> = {
  ar: "ar_SA",
  en: "en_US",
};

function localeToHreflang(locale: string) {
  return locale === "ar" ? "ar-SA" : locale;
}

function urlForLocaleAndPath(locale: string, path: string) {
  const trimmed = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${trimmed}`;
}

type BuildMetadataInput = {
  locale: string;
  page: SeoPageKey;
};

/**
 * Central metadata factory. Each page calls this from `generateMetadata`
 * with its locale + page key, and we read titles, descriptions and keywords
 * from the `Seo.<page>` namespace.
 */
export async function buildMetadata({
  locale,
  page,
}: BuildMetadataInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Seo" });
  const tPage = await getTranslations({
    locale,
    namespace: `Seo.${page}`,
  });

  const siteName = t("siteName");
  const siteDescription = t("siteDescription");
  const ogAlt = t("ogAlt");

  const path = PATH_BY_KEY[page];
  const canonical = urlForLocaleAndPath(locale, path);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[localeToHreflang(l)] = urlForLocaleAndPath(l, path);
  }
  // x-default points at the default locale's URL
  languages["x-default"] = urlForLocaleAndPath(routing.defaultLocale, path);

  const title = tPage("title");
  const description = tPage("description");
  const keywords = tPage("keywords");

  const isHome = page === "home";
  const titleTemplate = isHome ? title : `${title} — ${siteName}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: titleTemplate,
    description,
    keywords,
    applicationName: siteName,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    alternates: {
      canonical,
      languages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE_BY_LOCALE[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE_BY_LOCALE[l] ?? l),
      url: canonical,
      siteName,
      title: titleTemplate,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: ogAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleTemplate,
      description,
      images: ["/opengraph-image"],
    },
    other: {
      // Useful for crawlers that look at this directly
      "og:locale:alternate": (
        routing.locales
          .filter((l) => l !== locale)
          .map((l) => OG_LOCALE_BY_LOCALE[l] ?? l)
      ).join(", "),
    },
  };
}

/**
 * Helper to generate a canonical URL outside of metadata (used by JSON-LD).
 */
export function canonicalUrl(locale: string, page: SeoPageKey) {
  return urlForLocaleAndPath(locale, PATH_BY_KEY[page]);
}
