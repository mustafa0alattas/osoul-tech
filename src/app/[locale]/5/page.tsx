import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { variantMetadata } from "@/components/variants/metadata";
import { Sparkline, Gauge, Histogram, COLORS } from "@/components/variants/v5/charts";
import { Ticker } from "@/components/variants/v5/Ticker";
import { LiveCounter } from "@/components/variants/v5/LiveCounter";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║ Variant /5 — Data Symphony                                          ║
   ║ Bloomberg-restrained financial machinery aesthetic. Hero sparkline, ║
   ║ rotating ticker, every stat is a chart, scroll-progress, live mock  ║
   ║ counter on Final CTA. Tabular numerals everywhere.                  ║
   ║ Layout: dense-grid · Color: Paper+chart · Hero: data-viz            ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return variantMetadata(locale);
}

const HERO_SPARKLINE = [
  3, 3.6, 3.4, 4.2, 4.0, 4.8, 5.1, 4.9, 5.6, 6.0, 5.7, 6.3, 6.5, 6.4, 6.8,
];

export default function DataSymphony() {
  const t = useTranslations("Variant");

  const tickerItems = [
    { label: t("tickerYieldLabel"), value: t("tickerYieldValue") },
    { label: t("tickerInvestorsLabel"), value: t("tickerInvestorsValue") },
    { label: t("tickerVolumeLabel"), value: t("tickerVolumeValue") },
  ];

  const opps = [
    { city: t("opp1City"), type: t("opp1Type"), ret: t("opp1Return"), spark: [4.5, 5.0, 4.8, 5.3, 5.6, 5.4, 6.0, 6.3, 6.5] },
    { city: t("opp2City"), type: t("opp2Type"), ret: t("opp2Return"), spark: [5.0, 5.4, 5.2, 5.9, 6.1, 6.5, 6.7, 7.0, 7.2] },
    { city: t("opp3City"), type: t("opp3Type"), ret: t("opp3Return"), spark: [4.8, 5.1, 5.4, 5.6, 5.9, 6.2, 6.4, 6.6, 6.8] },
  ];

  return (
    <main className="bg-paper">
      {/* HERO — sparkline centerpiece + ticker bar */}
      <section className="bg-paper">
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-osoul-deep">
                {t("trustBadge")}
              </p>
              <h1
                className="mt-6 text-balance leading-[1.05] tracking-[-0.015em] text-ink"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", fontWeight: 700 }}
              >
                {t("headline")}
              </h1>
              <p className="mt-6 max-w-[58ch] text-pretty text-base leading-relaxed text-ink/70 sm:text-lg">
                {t("subheadline")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/register-interest"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 bg-osoul-pivot px-7 text-[0.95rem] font-semibold text-paper hover:bg-osoul-pivot/90",
                  )}
                >
                  {t("primaryCta")}
                </Link>
                <Link
                  href="/how-it-works"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 border-hairline bg-paper px-7 text-[0.95rem] font-medium text-ink hover:bg-parchment",
                  )}
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </div>

            {/* Hero data card */}
            <div className="lg:col-span-6">
              <figure className="rounded-[12px] border border-hairline bg-paper p-6 sm:p-7">
                <figcaption className="flex items-baseline justify-between gap-3">
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-ink">
                    {t("tickerYieldLabel")}
                  </span>
                  <span className="numerals-tabular numerals-ltr text-2xl font-bold tracking-[-0.01em] text-osoul-deep">
                    {t("tickerYieldValue")}
                  </span>
                </figcaption>
                <div className="-mx-6 mt-6 sm:-mx-7">
                  <Sparkline
                    data={HERO_SPARKLINE}
                    width={640}
                    height={140}
                    stroke={COLORS.pivot}
                    ariaLabel={`${t("tickerYieldLabel")}: ${t("tickerYieldValue")}`}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.14em] text-muted-ink">
                  <span>2024</span>
                  <span>2025</span>
                  <span>2026</span>
                </div>
              </figure>

              <div className="mt-4">
                <Ticker items={tickerItems} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS — each stat as a mini-chart */}
      <section className="border-y border-hairline bg-parchment/50">
        <Container className="max-w-[1440px] py-16 sm:py-20 lg:py-24">
          <header className="mb-12 max-w-2xl">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-osoul-deep">
              {t("statsEyebrow")}
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-tight text-ink">
              {t("statsHeadline")}
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 100% Sharia — full circle */}
            <article className="rounded-[10px] border border-hairline bg-paper p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-ink">
                    {t("stat1Label")}
                  </p>
                  <p className="numerals-tabular numerals-ltr mt-2 text-3xl font-bold text-osoul-deep">
                    {t("stat1Value")}{t("stat1Unit")}
                  </p>
                </div>
                <Gauge value={1} size={64} stroke={COLORS.pivot} ariaLabel={`${t("stat1Label")} 100%`} />
              </div>
            </article>
            {/* 1 deed — single bar/value */}
            <article className="rounded-[10px] border border-hairline bg-paper p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-ink">
                    {t("stat2Label")}
                  </p>
                  <p className="numerals-tabular numerals-ltr mt-2 text-3xl font-bold text-osoul-deep">
                    {t("stat2Value")}
                    <span className="ms-1 text-osoul-pivot">{t("stat2Unit")}</span>
                  </p>
                </div>
                <Histogram bars={[1]} width={48} height={48} stroke={COLORS.deep} ariaLabel={t("stat2Label")} />
              </div>
            </article>
            {/* 5 cities — histogram */}
            <article className="rounded-[10px] border border-hairline bg-paper p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-ink">
                    {t("stat3Label")}
                  </p>
                  <p className="numerals-tabular numerals-ltr mt-2 text-3xl font-bold text-osoul-deep">
                    {t("stat3Value")}{t("stat3Unit")}
                  </p>
                </div>
                <Histogram bars={[3, 4, 5, 4, 5]} width={64} height={48} stroke={COLORS.pivot} ariaLabel={t("stat3Label")} />
              </div>
            </article>
            {/* 12× — gauge at 0.85 */}
            <article className="rounded-[10px] border border-hairline bg-paper p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-ink">
                    {t("stat4Label")}
                  </p>
                  <p className="numerals-tabular numerals-ltr mt-2 text-3xl font-bold text-osoul-deep">
                    {t("stat4Value")}{t("stat4Unit")}
                  </p>
                </div>
                <Gauge value={0.85} size={64} stroke={COLORS.turq} ariaLabel={t("stat4Label")} />
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* HOW — horizontal progress bar above section */}
      <section className="bg-paper">
        <div className="sticky top-16 z-20 hidden bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/70 lg:block">
          <Container className="max-w-[1440px] py-3">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-muted-ink">
              <span className="numerals-tabular numerals-ltr">01 / 05</span>
              <div className="relative h-px flex-1 bg-hairline">
                <span aria-hidden="true" className="absolute h-px w-1/5 bg-osoul-pivot" />
              </div>
              <span>{t("howEyebrow")}</span>
            </div>
          </Container>
        </div>
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-28">
          <header className="mb-12 max-w-2xl">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("howEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-ink">
              {t("howHeadline")}
            </h2>
          </header>
          <ol className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n} className="border-t border-hairline pt-5">
                <span aria-hidden="true" className="numerals-tabular numerals-ltr text-[0.7rem] tracking-[0.16em] text-osoul-pivot">
                  {String(n).padStart(2, "0")} / 05
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-bold leading-tight text-ink">
                  {t(`step${n}Title`)}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                  {t(`step${n}Body`)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* WHY — each card carries a tiny chart */}
      <section className="border-y border-hairline bg-parchment/40">
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-28">
          <header className="mb-12 max-w-2xl">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("whyEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-ink">
              {t("whyHeadline")}
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { idx: 1, kind: "spark", spark: [3, 4, 4.2, 4.6, 5, 5.5, 6, 6.4] },
              { idx: 2, kind: "gauge", value: 1 },
              { idx: 3, kind: "histo", bars: [2, 3, 4, 3, 5, 4] },
              { idx: 4, kind: "spark", spark: [5.5, 5.4, 5.6, 5.7, 5.6, 5.8, 5.7, 5.9] },
              { idx: 5, kind: "gauge", value: 0.92 },
              { idx: 6, kind: "histo", bars: [4, 3, 5, 4, 4, 5, 4] },
            ].map((card) => (
              <article key={card.idx} className="rounded-[10px] border border-hairline bg-paper p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 max-w-[40ch]">
                    <span aria-hidden="true" className="numerals-tabular numerals-ltr text-[0.65rem] uppercase tracking-[0.14em] text-osoul-pivot/80">
                      {String(card.idx).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[1rem] font-bold leading-tight text-ink">{t(`why${card.idx}Title`)}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/70">{t(`why${card.idx}Body`)}</p>
                  </div>
                  <div className="shrink-0">
                    {card.kind === "spark" && (
                      <Sparkline data={card.spark!} width={110} height={48} stroke={COLORS.pivot} fill ariaLabel={t(`why${card.idx}Title`)} />
                    )}
                    {card.kind === "gauge" && (
                      <Gauge value={card.value!} size={56} stroke={COLORS.deep} ariaLabel={t(`why${card.idx}Title`)} />
                    )}
                    {card.kind === "histo" && (
                      <Histogram bars={card.bars!} width={110} height={48} stroke={COLORS.deep} ariaLabel={t(`why${card.idx}Title`)} />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* OPPORTUNITIES — each card a mini financial card */}
      <section className="bg-paper">
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-28">
          <header className="mb-12 max-w-2xl">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("oppsEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-ink">
              {t("oppsHeadline")}
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {opps.map((o, i) => (
              <article key={i} className="rounded-[10px] border border-hairline bg-paper">
                <div className="flex items-baseline justify-between gap-3 p-5 pb-0">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-ink">{o.type}</p>
                    <p className="text-lg font-bold text-ink">{o.city}</p>
                  </div>
                  <span className="rounded-full bg-osoul-turquoise/15 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-osoul-pivot">
                    {t("comingSoon")}
                  </span>
                </div>
                <div className="-mx-1 mt-4 px-4">
                  <Sparkline data={o.spark} width={300} height={70} stroke={COLORS.pivot} fill ariaLabel={`${o.city} ${t("expectedReturn")} ${o.ret}`} />
                </div>
                <div className="flex items-baseline justify-between border-t border-hairline p-5">
                  <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-ink">
                    {t("expectedReturn")}
                  </span>
                  <span className="numerals-tabular numerals-ltr text-2xl font-bold text-osoul-deep">{o.ret}</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* AUDIENCE — different chart per card */}
      <section className="border-y border-hairline bg-parchment/40">
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-28">
          <header className="mb-12 max-w-2xl">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("audEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-ink">
              {t("audHeadline")}
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Link href={{ pathname: "/register-interest", query: { type: "investor" } }} className="group rounded-[10px] border border-hairline bg-paper p-7 transition-colors hover:border-osoul-pivot/50">
              <h3 className="text-[1.125rem] font-bold text-ink">{t("audInvestorTitle")}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/70">{t("audInvestorBody")}</p>
              <div className="mt-6 -mx-1">
                <Sparkline data={[3, 3.5, 4.0, 4.6, 5.1, 5.7, 6.2, 6.5]} width={300} height={48} stroke={COLORS.pivot} fill ariaLabel={t("audInvestorTitle")} />
              </div>
            </Link>
            <Link href={{ pathname: "/register-interest", query: { type: "owner" } }} className="group rounded-[10px] border border-hairline bg-paper p-7 transition-colors hover:border-osoul-deep/50">
              <h3 className="text-[1.125rem] font-bold text-ink">{t("audOwnerTitle")}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/70">{t("audOwnerBody")}</p>
              <div className="mt-6">
                <Histogram bars={[3, 4, 4, 5, 5, 6, 6, 7]} width={300} height={48} stroke={COLORS.deep} ariaLabel={t("audOwnerTitle")} />
              </div>
            </Link>
            <Link href={{ pathname: "/register-interest", query: { type: "partner" } }} className="group rounded-[10px] border border-hairline bg-paper p-7 transition-colors hover:border-osoul-turquoise/60">
              <h3 className="text-[1.125rem] font-bold text-ink">{t("audPartnerTitle")}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/70">{t("audPartnerBody")}</p>
              <div className="mt-6 flex justify-end">
                <Gauge value={0.78} size={72} stroke={COLORS.turq} ariaLabel={t("audPartnerTitle")} />
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* FINAL CTA — live counter */}
      <section className="bg-osoul-deep text-paper">
        <Container className="max-w-[1440px] py-24 sm:py-28 lg:py-32">
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper/70">{t("finalKicker")}</p>
              <h2 className="mt-5 text-balance text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                {t("finalHeadline")}
              </h2>
              <p className="mt-6 max-w-[58ch] text-pretty text-base font-light leading-relaxed text-paper/85 sm:text-lg">
                {t("finalSub")}
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <div className="text-end">
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-paper/60">
                  {t("registrationsLabel")}
                </p>
                <p className="mt-2 text-4xl">
                  <LiveCounter seed={1240} />
                </p>
              </div>
              <Link
                href="/register-interest"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-13 bg-paper px-8 text-[1rem] font-bold text-osoul-deep hover:bg-paper/95",
                )}
              >
                {t("finalCta")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
