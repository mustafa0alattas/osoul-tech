import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const plexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  const t = await getTranslations({ locale, namespace: "Seo" });
  const tA11y = await getTranslations({ locale, namespace: "A11y" });

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("siteName"),
    alternateName: locale === "ar" ? "Osoul.Tech" : "أصول تك",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    description: t("siteDescription"),
    areaServed: "SA",
    knowsAbout: [
      "Fractional Real Estate Ownership",
      "Real Estate Sukuk",
      "Sharia-Compliant Investment",
    ],
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("siteName"),
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale === "ar" ? "ar-SA" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/faq?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${plexSans.variable} ${plexSansArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:inline-flex focus:items-center focus:rounded-md focus:bg-osoul-pivot focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper focus:shadow-rest focus:outline-none focus:ring-3 focus:ring-osoul-pivot/40"
        >
          {tA11y("skipToContent")}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
