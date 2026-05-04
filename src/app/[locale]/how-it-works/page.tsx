import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Check } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "howItWorks" });
}

export default function HowItWorksPage() {
  const t = useTranslations("How2");

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
    { title: t("step4Title"), body: t("step4Body") },
    { title: t("step5Title"), body: t("step5Body") },
  ];

  const sukukPoints = [
    t("sukukPoint1"),
    t("sukukPoint2"),
    t("sukukPoint3"),
  ];

  const exitPoints = [
    { title: t("exitPoint1Title"), body: t("exitPoint1Body") },
    { title: t("exitPoint2Title"), body: t("exitPoint2Body") },
    { title: t("exitPoint3Title"), body: t("exitPoint3Body") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        headline={t("heroHeadline")}
        sub={t("heroSub")}
      />

      {/* Five steps */}
      <section className="border-y border-hairline bg-parchment">
        <Container className="py-20 sm:py-24 lg:py-28">
          <ol>
            {steps.map((step, i) => (
              <li
                key={i}
                className="animate-rise grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-hairline py-9 first:border-t-0 first:pt-0 sm:gap-x-10 sm:py-11"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span
                  className="numerals-tabular numerals-ltr -mt-2 select-none text-[clamp(2.5rem,5vw,4rem)] font-light leading-none text-osoul-pivot/80"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 max-w-[64ch]">
                  <h2 className="text-[clamp(1.25rem,2.2vw,1.625rem)] font-semibold leading-tight text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink/75">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Sukuk */}
      <section className="bg-paper">
        <Container className="grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <header className="animate-rise">
            <SectionEyebrow>{t("sukukEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("sukukHeadline")}
            </h2>
            <p className="mt-6 max-w-[55ch] text-[1.0625rem] leading-relaxed text-ink/75">
              {t("sukukBody")}
            </p>
          </header>
          <ul className="animate-rise flex flex-col gap-4 self-center" style={{ animationDelay: "80ms" }}>
            {sukukPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-[10px] border border-hairline bg-parchment/60 p-5"
              >
                <Check
                  className="mt-0.5 size-5 shrink-0 text-osoul-pivot"
                  aria-hidden="true"
                />
                <span className="text-[0.95rem] leading-relaxed text-ink/85">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Returns */}
      <section className="border-y border-hairline bg-parchment">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("returnsEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("returnsHeadline")}
            </h2>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:mt-14 lg:grid-cols-3 lg:gap-x-12">
            <article className="animate-rise">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">
                {t("returnsRentalLabel")}
              </span>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink/80">
                {t("returnsRentalBody")}
              </p>
            </article>
            <article className="animate-rise" style={{ animationDelay: "60ms" }}>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">
                {t("returnsCapitalLabel")}
              </span>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink/80">
                {t("returnsCapitalBody")}
              </p>
            </article>
            <article className="animate-rise" style={{ animationDelay: "120ms" }}>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">
                {t("returnsHoldingLabel")}
              </span>
              <p className="mt-4 text-[1rem] leading-relaxed text-ink/80">
                {t("returnsHoldingBody")}
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* Exit */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("exitEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("exitHeadline")}
            </h2>
            <p className="animate-rise mt-6 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink/80">
              {t("exitBody")}
            </p>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-14">
            {exitPoints.map((point, i) => (
              <article
                key={i}
                className="animate-rise rounded-[10px] border border-hairline bg-parchment/50 p-6 sm:p-7"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
