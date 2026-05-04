import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { variantMetadata } from "@/components/variants/metadata";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║ Variant /2 — Editorial Sukuk                                        ║
   ║ FT/Monocle broadsheet. Hanging punctuation, italic pull-quotes with ║
   ║ Pivot vertical bars, classical 65ch column, masthead metadata.      ║
   ║ Static-editorial. No shaders. No hover-driven layout changes.       ║
   ║ Layout: editorial · Color: Paper+rule · Hero: type-only             ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return variantMetadata(locale);
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <figure className="mx-auto max-w-[60ch] py-12 lg:py-16">
      <blockquote className="relative ps-5">
        <span
          aria-hidden="true"
          className="absolute top-1 h-[calc(100%-0.5rem)] w-[2px] bg-osoul-pivot start-0"
        />
        <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-medium italic leading-[1.45] text-ink/90">
          {children}
        </p>
      </blockquote>
    </figure>
  );
}

export default function EditorialSukuk() {
  const t = useTranslations("Variant");
  const stats = [1, 2, 3, 4].map((i) => ({
    v: t(`stat${i}Value`),
    u: t(`stat${i}Unit`),
    l: t(`stat${i}Label`),
  }));
  const steps = [1, 2, 3, 4, 5].map((i) => ({
    n: i,
    title: t(`step${i}Title`),
    body: t(`step${i}Body`),
  }));
  const whys = [1, 2, 3, 4, 5, 6].map((i) => ({
    n: i,
    title: t(`why${i}Title`),
    body: t(`why${i}Body`),
  }));

  return (
    <article className="bg-paper">
      {/* MASTHEAD */}
      <Container className="max-w-[1080px] pt-12">
        <div className="flex items-center justify-between border-b border-hairline pb-4 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-ink">
          <span>{t("issueLabel")}</span>
          <span className="numerals-tabular numerals-ltr">N° 01</span>
        </div>
      </Container>

      {/* HERO — magazine cover */}
      <section className="bg-paper">
        <Container className="max-w-[1080px] py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-osoul-deep">
                {t("trustBadge")}
              </p>
              <h1
                className="mt-8 text-balance font-bold leading-[0.95] tracking-[-0.025em] text-ink"
                style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
              >
                {t("headlineLineA")}{" "}
                <span className="block">{t("headlineLineB")}</span>
                <span className="block">
                  {t("headlineLineC").replace(/[\.\.]+$/, "")}
                  {/* Hanging dot — sits OUTSIDE the optical column */}
                  <span aria-hidden="true" className="ms-1 text-osoul-pivot">
                    .
                  </span>
                </span>
              </h1>
            </div>
          </div>
        </Container>
      </section>

      {/* INTRO — editorial column */}
      <section className="bg-paper">
        <Container className="max-w-[1080px] pb-12 lg:pb-20">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
            <p className="font-light leading-[1.65] text-ink/75 lg:col-span-7" style={{ fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)", maxWidth: "65ch" }}>
              {t("subheadline")}
            </p>
            <div className="lg:col-span-4 lg:col-start-9">
              <Link
                href="/register-interest"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 bg-osoul-pivot px-6 text-[0.95rem] font-semibold text-paper hover:bg-osoul-pivot/90",
                )}
              >
                {t("primaryCta")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* PULL QUOTE 1 */}
      <Container className="max-w-[1080px]">
        <PullQuote>{t("pullQuote")}</PullQuote>
      </Container>

      {/* STATS — editorial infographic, 4 columns with hairlines top + bottom */}
      <section className="bg-paper">
        <Container className="max-w-[1080px] py-16 lg:py-24">
          <header className="mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-osoul-deep">
              {t("statsEyebrow")}
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-tight text-ink">
              {t("statsHeadline")}
            </h2>
          </header>
          <div className="border-y border-ink/15">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <article
                  key={i}
                  className={cn(
                    "p-8",
                    "border-hairline",
                    i % 2 === 1 ? "border-s" : "",
                    "lg:border-s lg:first:border-s-0",
                  )}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="numerals-tabular numerals-ltr text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                      {s.v}
                    </span>
                    <span aria-hidden="true" className="numerals-ltr text-2xl font-light text-osoul-pivot">
                      {s.u}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[24ch] text-[0.85rem] font-light leading-snug text-ink/65">
                    {s.l}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* HOW — 2-column editorial list */}
      <section className="bg-paper">
        <Container className="max-w-[1080px] py-16 lg:py-24">
          <header className="mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-osoul-deep">{t("howEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-ink">
              {t("howHeadline")}
            </h2>
          </header>
          <ol>
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] items-start gap-x-8 border-t border-hairline py-10 first:border-t-0 first:pt-0 sm:gap-x-12 lg:grid-cols-[clamp(7rem,14vw,12rem)_1fr]">
                <span className="numerals-tabular numerals-ltr -mt-2 select-none text-[clamp(3rem,7vw,5rem)] font-extrabold leading-none text-ink/90" aria-hidden="true">
                  {String(s.n).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold leading-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[65ch] font-light leading-[1.7] text-ink/70" style={{ fontSize: "1rem" }}>
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* PULL QUOTE 2 */}
      <Container className="max-w-[1080px]">
        <PullQuote>{t("whyHeadline")}</PullQuote>
      </Container>

      {/* WHY — 2x3 typographic grid, no card chrome, just hairlines */}
      <section className="bg-paper">
        <Container className="max-w-[1080px] py-16 lg:py-24">
          <header className="mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-osoul-deep">{t("whyEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.01em] text-ink">
              {t("whyLead")}
            </h2>
          </header>

          <div className="border-y border-ink/15">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {whys.map((w, i) => (
                <article
                  key={w.n}
                  className={cn(
                    "p-8",
                    // hairlines: between columns and between rows
                    "border-hairline",
                    "border-t first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0",
                    i % 2 === 1 ? "sm:border-s" : "",
                    "lg:border-s lg:[&:nth-child(3n+1)]:border-s-0",
                  )}
                >
                  <span aria-hidden="true" className="numerals-tabular numerals-ltr text-xs font-medium tracking-[0.16em] text-osoul-pivot">
                    {String(w.n).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] font-bold leading-snug text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-2 font-light leading-relaxed text-ink/70" style={{ fontSize: "0.95rem", maxWidth: "40ch" }}>
                    {w.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* OUTRO — editorial page-end */}
      <section className="bg-paper">
        <Container className="max-w-[1080px] py-16 lg:py-24">
          <div className="border-t border-hairline pt-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-osoul-deep">
              {t("finalKicker")}
            </p>
            <h2 className="mt-4 text-[clamp(1.875rem,3.5vw,3rem)] font-bold italic leading-tight tracking-[-0.005em] text-ink">
              {t("finalHeadline")}
            </h2>
            <p className="mx-auto mt-5 max-w-[55ch] font-light leading-relaxed text-ink/70" style={{ fontSize: "1.0625rem" }}>
              {t("finalSub")}
            </p>
            <div className="mt-10">
              <Link
                href="/register-interest"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 bg-osoul-deep px-8 text-[0.95rem] font-semibold text-paper hover:bg-osoul-deep/90",
                )}
              >
                {t("finalCta")}
                <span aria-hidden="true" className="ms-2 inline-block rtl:scale-x-[-1]">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
