import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ShieldCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "about" });
}

export default function AboutPage() {
  const t = useTranslations("About");

  const layers = [
    { title: t("nameLayer1Title"), body: t("nameLayer1Body") },
    { title: t("nameLayer2Title"), body: t("nameLayer2Body") },
    { title: t("nameLayer3Title"), body: t("nameLayer3Body") },
  ];

  const values = [t("value1"), t("value2"), t("value3"), t("value4")];

  const traits = [
    { title: t("trait1Title"), body: t("trait1Body") },
    { title: t("trait2Title"), body: t("trait2Body") },
    { title: t("trait3Title"), body: t("trait3Body") },
    { title: t("trait4Title"), body: t("trait4Body") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        headline={t("heroHeadline")}
        sub={t("heroSub")}
      />

      {/* Name meaning */}
      <section className="border-y border-hairline bg-parchment">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("nameEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("nameHeadline")}
            </h2>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-3">
            {layers.map((layer, i) => (
              <article
                key={i}
                className="animate-rise flex flex-col gap-4 rounded-[10px] border border-hairline bg-paper p-7 sm:p-8"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span
                  className="numerals-tabular numerals-ltr text-xs font-medium tracking-wider text-osoul-deep/80"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-tight text-ink">
                  {layer.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-ink/70">
                  {layer.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("mvvEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("mvvHeadline")}
            </h2>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-3 lg:gap-12">
            <article className="animate-rise">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">
                {t("missionLabel")}
              </span>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80">
                {t("missionBody")}
              </p>
            </article>
            <article className="animate-rise" style={{ animationDelay: "60ms" }}>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">
                {t("visionLabel")}
              </span>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80">
                {t("visionBody")}
              </p>
            </article>
            <article
              className="animate-rise"
              style={{ animationDelay: "120ms" }}
            >
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">
                {t("valuesLabel")}
              </span>
              <ul className="mt-4 flex flex-col gap-3">
                {values.map((value, i) => (
                  <li
                    key={value}
                    className="flex items-baseline gap-3 text-[1.0625rem] text-ink/80"
                  >
                    <span
                      className="numerals-tabular numerals-ltr text-sm text-osoul-pivot/70"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      {/* Personality */}
      <section className="border-y border-hairline bg-parchment">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("personalityEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("personalityHeadline")}
            </h2>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:gap-y-12">
            {traits.map((trait, i) => (
              <article
                key={i}
                className="animate-rise"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-tight text-ink">
                  {trait.title}
                </h3>
                <p className="mt-3 max-w-[55ch] text-[0.95rem] leading-relaxed text-ink/70">
                  {trait.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Regulatory standing */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <header className="animate-rise">
              <SectionEyebrow>{t("regaEyebrow")}</SectionEyebrow>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
                {t("regaHeadline")}
              </h2>
            </header>
            <p className="animate-rise mt-6 text-[1.0625rem] leading-relaxed text-ink/80">
              {t("regaBody")}
            </p>
            <div className="animate-rise mt-7 inline-flex items-center gap-2 rounded-full border border-hairline bg-parchment/70 px-3 py-1.5">
              <ShieldCheck
                className="size-4 text-osoul-pivot"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-ink/75">
                {t("regaTag")}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
