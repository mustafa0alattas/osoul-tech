import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FaqList,
  type FaqCategory,
} from "@/components/sections/faq/FaqList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "faq" });
}

export default function FaqPage() {
  const t = useTranslations("Faq");

  const categories: FaqCategory[] = [
    {
      id: "g",
      label: t("catGeneralLabel"),
      items: [
        { id: "g1", q: t("g1Q"), a: t("g1A") },
        { id: "g2", q: t("g2Q"), a: t("g2A") },
        { id: "g3", q: t("g3Q"), a: t("g3A") },
        { id: "g4", q: t("g4Q"), a: t("g4A") },
        { id: "g5", q: t("g5Q"), a: t("g5A") },
      ],
    },
    {
      id: "o",
      label: t("catOwnershipLabel"),
      items: [
        { id: "o1", q: t("o1Q"), a: t("o1A") },
        { id: "o2", q: t("o2Q"), a: t("o2A") },
        { id: "o3", q: t("o3Q"), a: t("o3A") },
        { id: "o4", q: t("o4Q"), a: t("o4A") },
      ],
    },
    {
      id: "r",
      label: t("catReturnsLabel"),
      items: [
        { id: "r1", q: t("r1Q"), a: t("r1A") },
        { id: "r2", q: t("r2Q"), a: t("r2A") },
        { id: "r3", q: t("r3Q"), a: t("r3A") },
        { id: "r4", q: t("r4Q"), a: t("r4A") },
      ],
    },
    {
      id: "e",
      label: t("catExitLabel"),
      items: [
        { id: "e1", q: t("e1Q"), a: t("e1A") },
        { id: "e2", q: t("e2Q"), a: t("e2A") },
        { id: "e3", q: t("e3Q"), a: t("e3A") },
      ],
    },
    {
      id: "s",
      label: t("catShariahLabel"),
      items: [
        { id: "s1", q: t("s1Q"), a: t("s1A") },
        { id: "s2", q: t("s2Q"), a: t("s2A") },
        { id: "s3", q: t("s3Q"), a: t("s3A") },
      ],
    },
    {
      id: "a",
      label: t("catAccountLabel"),
      items: [
        { id: "a1", q: t("a1Q"), a: t("a1A") },
        { id: "a2", q: t("a2Q"), a: t("a2A") },
        { id: "a3", q: t("a3Q"), a: t("a3A") },
      ],
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: it.a,
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqList
        eyebrow={t("heroEyebrow")}
        headline={t("heroHeadline")}
        sub={t("heroSub")}
        searchPlaceholder={t("searchPlaceholder")}
        noResults={t("noResults")}
        categories={categories}
      />

      {/* Fallback CTA */}
      <section className="bg-paper">
        <Container className="flex flex-col items-start gap-6 py-20 sm:py-24 lg:py-28">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight text-ink">
            {t("fallbackHeadline")}
          </h2>
          <p className="max-w-[55ch] text-base leading-relaxed text-ink/75">
            {t("fallbackBody")}
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-hairline bg-paper px-5 text-ink hover:bg-parchment",
            )}
          >
            {t("fallbackCta")}
          </Link>
        </Container>
      </section>
    </>
  );
}
