import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Check, Info } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "shariah" });
}

export default function ShariahPage() {
  const t = useTranslations("Shariah");

  const whyPoints = [t("whyPoint1"), t("whyPoint2"), t("whyPoint3")];

  const members = [
    {
      monogram: "أ",
      name: t("member1Name"),
      bio: t("member1Bio"),
      tag: t("member1Tag"),
    },
    {
      monogram: "ب",
      name: t("member2Name"),
      bio: t("member2Bio"),
      tag: t("member2Tag"),
    },
    {
      monogram: "ج",
      name: t("member3Name"),
      bio: t("member3Bio"),
      tag: t("member3Tag"),
    },
  ];

  const concepts = [
    { title: t("structure1Title"), body: t("structure1Body") },
    { title: t("structure2Title"), body: t("structure2Body") },
    { title: t("structure3Title"), body: t("structure3Body") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        headline={t("heroHeadline")}
        sub={t("heroSub")}
      />

      {/* Why it matters */}
      <section className="border-y border-hairline bg-parchment">
        <Container className="grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <header className="animate-rise lg:col-span-5">
            <SectionEyebrow>{t("whyEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("whyHeadline")}
            </h2>
          </header>
          <div className="animate-rise lg:col-span-7" style={{ animationDelay: "60ms" }}>
            <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink/80">
              {t("whyBody")}
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {whyPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[0.95rem] text-ink/85"
                >
                  <Check
                    className="mt-1 size-4 shrink-0 text-osoul-pivot"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Committee */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("committeeEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("committeeHeadline")}
            </h2>
          </header>

          <div className="animate-rise mt-7 inline-flex items-start gap-2 rounded-[10px] border border-hairline bg-parchment/60 px-4 py-3">
            <Info
              className="mt-0.5 size-4 shrink-0 text-osoul-deep"
              aria-hidden="true"
            />
            <p className="max-w-[60ch] text-sm leading-relaxed text-ink/75">
              {t("committeeNote")}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {members.map((m, i) => (
              <article
                key={i}
                className="animate-rise flex flex-col gap-5 rounded-[10px] border border-hairline bg-paper p-6 sm:p-7"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-parchment text-3xl font-bold text-osoul-deep">
                  <span aria-hidden="true">{m.monogram}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{m.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">
                    {m.bio}
                  </p>
                </div>
                <span className="mt-auto inline-flex w-fit items-center rounded-full bg-parchment px-3 py-1 text-[0.7rem] font-medium tracking-wide text-osoul-pivot">
                  {m.tag}
                </span>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Sharia structure */}
      <section className="border-y border-hairline bg-parchment">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("structureEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
              {t("structureHeadline")}
            </h2>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:mt-14 lg:grid-cols-3 lg:gap-x-12">
            {concepts.map((concept, i) => (
              <article
                key={i}
                className="animate-rise"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span
                  className="numerals-tabular numerals-ltr text-xs font-medium tracking-wider text-osoul-pivot/80"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[clamp(1.25rem,2.2vw,1.625rem)] font-semibold leading-tight text-ink">
                  {concept.title}
                </h3>
                <p className="mt-3 max-w-[55ch] text-[1rem] leading-relaxed text-ink/75">
                  {concept.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Ongoing audit */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <header className="animate-rise">
              <SectionEyebrow>{t("auditEyebrow")}</SectionEyebrow>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
                {t("auditHeadline")}
              </h2>
            </header>
            <p className="animate-rise mt-6 text-[1.0625rem] leading-relaxed text-ink/80">
              {t("auditBody")}
            </p>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
