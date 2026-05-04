import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { variantMetadata } from "@/components/variants/metadata";
import { BrushedAmbient } from "@/components/variants/v1/BrushedAmbient";
import { CountUp } from "@/components/variants/v1/CountUp";
import { CinematicCta } from "@/components/variants/v1/CinematicCta";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║ Variant /1 — Cinematic Vault                                        ║
   ║ Apple-style narrative scroll. 95vh sections, brushed-Pivot WebGL,   ║
   ║ scroll-timeline reveals, mask-image headline clip, View Transitions.║
   ║ Layout: centered narrative · Color: Paper+Pivot · Hero: webgl+type  ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return variantMetadata(locale);
}

export default function CinematicVault() {
  const t = useTranslations("Variant");

  const stats = [
    { v: 100, u: t("stat1Unit"), l: t("stat1Label") },
    { v: 1, u: t("stat2Unit"), l: t("stat2Label") },
    { v: 5, u: t("stat3Unit"), l: t("stat3Label") },
    { v: 12, u: t("stat4Unit"), l: t("stat4Label") },
  ];
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
  const opps = [1, 2, 3].map((i) => ({
    city: t(`opp${i}City`),
    type: t(`opp${i}Type`),
    ret: t(`opp${i}Return`),
  }));
  const audiences: Array<{ type: "investor" | "owner" | "partner"; title: string; body: string; }> = [
    { type: "investor", title: t("audInvestorTitle"), body: t("audInvestorBody") },
    { type: "owner", title: t("audOwnerTitle"), body: t("audOwnerBody") },
    { type: "partner", title: t("audPartnerTitle"), body: t("audPartnerBody") },
  ];

  return (
    <>
      {/* HERO — brushed ambient, mask-image clipped headline */}
      <section
        data-reveal
        className="relative isolate flex min-h-[95vh] items-center overflow-hidden bg-paper"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(900px 600px at 78% 22%, rgba(35,145,160,0.08), transparent 60%), radial-gradient(700px 500px at 18% 82%, rgba(15,99,165,0.05), transparent 60%), linear-gradient(180deg, #FBFAF7 0%, #F3F0EA 100%)",
            }}
          />
          <BrushedAmbient className="absolute inset-0 h-full w-full motion-reduce:hidden" />
        </div>

        <Container className="relative max-w-[1280px] py-32 lg:py-40">
          <div className="mx-auto max-w-[58rem]">
            <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-hairline bg-paper/80 px-3 py-1.5 backdrop-blur-[2px]">
              <ShieldCheck className="size-3.5 text-osoul-pivot" aria-hidden="true" />
              <span className="text-xs leading-snug text-ink/75">{t("trustBadge")}</span>
            </div>

            <h1
              className="text-balance font-extrabold leading-[0.92] tracking-[-0.025em] text-ink"
              style={{
                fontSize: "clamp(3rem, 8vw, 7.5rem)",
                WebkitMaskImage:
                  "linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%)",
                maskImage:
                  "linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%)",
              }}
            >
              {t("headline")}
            </h1>

            <p className="mt-10 max-w-[60ch] text-pretty font-light leading-relaxed text-ink/70" style={{ fontSize: "clamp(1.125rem, 1.5vw, 1.4rem)" }}>
              {t("subheadline")}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <CinematicCta
                href="/register-interest"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-13 gap-2 bg-osoul-pivot px-7 text-[1rem] font-semibold text-paper shadow-rest transition-colors hover:bg-osoul-pivot/90",
                )}
              >
                <span>{t("primaryCta")}</span>
                <ArrowRight className="rtl-flip size-4" aria-hidden="true" />
              </CinematicCta>
              <Link
                href="/how-it-works"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-13 border-hairline bg-paper px-7 text-[1rem] font-medium text-ink hover:bg-parchment",
                )}
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS — 4 numerals with IO count-up, scale-in via reveal */}
      <section data-reveal className="border-y border-hairline bg-paper">
        <Container className="max-w-[1280px] py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">
              {t("statsEyebrow")}
            </p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
              {t("statsHeadline")}
            </h2>
          </div>

          <div className="mx-auto mt-20 grid max-w-[58rem] grid-cols-2 gap-x-10 gap-y-14 lg:grid-cols-4">
            {stats.map((s, i) => (
              <article
                key={i}
                className="flex flex-col gap-3"
                style={{ ['--osoul-dash' as string]: '1' }}
              >
                <div className="flex items-baseline gap-1">
                  <CountUp
                    to={s.v}
                    className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em] text-osoul-pivot"
                  />
                  <span aria-hidden="true" className="numerals-ltr text-3xl font-light text-osoul-deep/60">
                    {s.u}
                  </span>
                </div>
                <p className="max-w-[26ch] text-sm leading-relaxed text-ink/65">{s.l}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW — narrative steps, each its own ~95vh moment on desktop */}
      <section data-reveal className="bg-parchment/30">
        <Container className="max-w-[1280px] py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("howEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
              {t("howHeadline")}
            </h2>
          </div>

          <ol className="mx-auto mt-20 max-w-[58rem] space-y-16 lg:space-y-24">
            {steps.map((s, i) => (
              <li
                key={s.n}
                data-reveal
                className="grid grid-cols-[auto_1fr] items-start gap-x-8 sm:gap-x-12"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span
                  className="numerals-tabular numerals-ltr select-none text-[clamp(3rem,5vw,4.5rem)] font-extralight leading-none text-osoul-pivot/70"
                  aria-hidden="true"
                >
                  {String(s.n).padStart(2, "0")}
                </span>
                <div className="min-w-0 max-w-[60ch]">
                  <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-base font-light leading-relaxed text-ink/70 sm:text-lg">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* WHY — bento with 60ms cascade */}
      <section data-reveal className="bg-paper">
        <Container className="max-w-[1280px] py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("whyEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
              {t("whyHeadline")}
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whys.map((w, i) => (
              <article
                key={w.n}
                data-reveal
                className="group rounded-[12px] border border-hairline bg-paper p-7 transition-all duration-500 hover:border-osoul-pivot/40 hover:shadow-lift sm:p-8"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span aria-hidden="true" className="numerals-tabular numerals-ltr text-xs font-medium tracking-[0.16em] text-osoul-pivot/80">
                  {String(w.n).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold leading-tight text-ink sm:text-xl">{w.title}</h3>
                <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-ink/65">{w.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* OPPORTUNITIES — 3 quiet cards */}
      <section data-reveal className="border-y border-hairline bg-parchment/40">
        <Container className="max-w-[1280px] py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("oppsEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
              {t("oppsHeadline")}
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-3">
            {opps.map((o, i) => (
              <article key={i} data-reveal className="overflow-hidden rounded-[12px] border border-hairline bg-paper">
                <div className="flex h-44 items-center justify-center border-b border-hairline bg-parchment/60">
                  <span className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-ink/85">{o.city}</span>
                </div>
                <div className="flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-[0.85rem] text-ink/65">{o.type}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-ink">{t("expectedReturn")}</p>
                  </div>
                  <span className="numerals-tabular numerals-ltr text-2xl font-bold text-osoul-deep">{o.ret}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-[40rem] text-center text-base text-ink/70">{t("oppsCtaBelow")}</p>
        </Container>
      </section>

      {/* AUDIENCE — alternating slide-in directions */}
      <section data-reveal className="bg-paper">
        <Container className="max-w-[1280px] py-24 lg:py-32">
          <div className="mx-auto max-w-[58rem]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("audEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
              {t("audHeadline")}
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-3">
            {audiences.map((a, i) => (
              <Link
                key={a.type}
                href={{ pathname: "/register-interest", query: { type: a.type } }}
                data-reveal
                className="group flex flex-col justify-between gap-10 rounded-[12px] border border-hairline bg-paper p-7 transition-all duration-500 hover:border-osoul-pivot/40 hover:shadow-lift sm:p-9"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div>
                  <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold leading-tight text-ink">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-ink/65">{a.body}</p>
                </div>
                <ArrowRight className="rtl-flip size-5 text-osoul-pivot transition-transform group-hover:translate-x-1 motion-reduce:transition-none rtl:group-hover:-translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA — Deep Anchor Blue moment */}
      <section data-reveal className="relative overflow-hidden bg-osoul-deep">
        <Container className="max-w-[1280px] py-28 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[58rem] text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/70">{t("finalKicker")}</p>
            <h2 className="mt-5 text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-paper">
              {t("finalHeadline")}
            </h2>
            <p className="mx-auto mt-6 max-w-[55ch] text-pretty text-base font-light leading-relaxed text-paper/80 sm:text-lg">
              {t("finalSub")}
            </p>
            <div className="mt-12">
              <CinematicCta
                href="/register-interest"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-13 bg-paper px-8 text-[1rem] font-bold text-osoul-deep shadow-rest hover:bg-paper/95",
                )}
              >
                {t("finalCta")}
              </CinematicCta>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
