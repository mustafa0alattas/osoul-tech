import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { variantMetadata } from "@/components/variants/metadata";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║ Variant /3 — Bold Manifesto                                         ║
   ║ Vercel/Figma color-confident asymmetry. Full-bleed Deep hero with   ║
   ║ Turquoise diagonal slab, alternating section colors, all-five-color ║
   ║ bento, color-fill audience hovers. Hover-driven, statement-led.     ║
   ║ Layout: asymmetric · Color: ALL FIVE · Hero: type-on-color          ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return variantMetadata(locale);
}

type Aud = { type: "investor" | "owner" | "partner"; title: string; body: string; tone: "pivot" | "deep" | "turquoise" };

export default function BoldManifesto() {
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
  const whys = [
    { n: 1, t: t("why1Title"), b: t("why1Body"), fill: "pivot" },
    { n: 2, t: t("why2Title"), b: t("why2Body"), fill: "paper" },
    { n: 3, t: t("why3Title"), b: t("why3Body"), fill: "deep" },
    { n: 4, t: t("why4Title"), b: t("why4Body"), fill: "turquoise-soft" },
    { n: 5, t: t("why5Title"), b: t("why5Body"), fill: "parchment" },
    { n: 6, t: t("why6Title"), b: t("why6Body"), fill: "pivot-soft" },
  ] as const;
  const audiences: Aud[] = [
    { type: "investor", title: t("audInvestorTitle"), body: t("audInvestorBody"), tone: "pivot" },
    { type: "owner", title: t("audOwnerTitle"), body: t("audOwnerBody"), tone: "deep" },
    { type: "partner", title: t("audPartnerTitle"), body: t("audPartnerBody"), tone: "turquoise" },
  ];
  const stepBg = ["bg-paper", "bg-parchment", "bg-osoul-pivot/10", "bg-paper", "bg-osoul-deep/[0.06]"];

  return (
    <>
      {/* HERO — Deep full-bleed with off-grid headline + Turquoise diagonal slab */}
      <section className="relative isolate overflow-hidden bg-osoul-deep text-paper">
        {/* Turquoise diagonal accent block — 10% viewport, -3deg, behind type */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-0 bg-osoul-turquoise/[0.18]"
          style={{
            insetInlineStart: "55%",
            top: "20%",
            width: "60%",
            height: "20vh",
            transform: "rotate(-3deg)",
          }}
        />
        {/* Subtle deep-blue depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(1100px 700px at 18% 30%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />

        <Container className="relative z-10 max-w-[1440px]">
          <div className="grid min-h-[80vh] grid-cols-1 items-center gap-y-8 py-24 sm:py-28 lg:py-32">
            <div className="lg:col-span-12">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-paper/70">{t("kicker")}</p>
              <h1
                className="mt-6 text-balance font-extrabold leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
              >
                <span className="block">{t("headlineLineA")}</span>
                <span className="block ps-[8%] text-osoul-turquoise">{t("headlineLineB")}</span>
                <span className="block">{t("headlineLineC")}</span>
              </h1>
              <p className="mt-10 max-w-[58ch] text-pretty text-base font-light leading-relaxed text-paper/80 sm:text-lg lg:text-xl">
                {t("subheadline")}
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-3">
                <Link
                  href="/register-interest"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-13 bg-paper px-8 text-[1rem] font-bold text-osoul-deep shadow-rest hover:bg-paper/95",
                  )}
                >
                  {t("primaryCta")}
                </Link>
                <Link
                  href="/how-it-works"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-13 border-paper/30 bg-transparent px-8 text-[1rem] font-medium text-paper hover:border-paper/60 hover:bg-paper/10",
                  )}
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS — Pivot full-bleed, Paper numerals */}
      <section className="bg-osoul-pivot text-paper">
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/70">{t("statsEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em]">
              {t("statsHeadline")}
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {stats.map((s, i) => (
              <article key={i} className="flex flex-col gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="numerals-tabular numerals-ltr text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em]">
                    {s.v}
                  </span>
                  <span aria-hidden="true" className="numerals-ltr text-3xl font-light text-paper/70">{s.u}</span>
                </div>
                <p className="max-w-[26ch] text-sm font-light leading-snug text-paper/85">{s.l}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW — alternating tinted backgrounds */}
      <section className="bg-paper">
        <div>
          {steps.map((s, i) => (
            <div key={s.n} className={cn("border-b border-hairline last:border-b-0", stepBg[i])}>
              <Container className="max-w-[1440px] py-20 lg:py-24">
                <div className="grid grid-cols-[auto_1fr] items-start gap-x-8 sm:gap-x-12 lg:grid-cols-[clamp(8rem,16vw,14rem)_1fr]">
                  <span aria-hidden="true" className="numerals-tabular numerals-ltr -mt-2 select-none text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em] text-osoul-deep">
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 max-w-[65ch]">
                    <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold leading-tight text-ink">{s.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">{s.body}</p>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </section>

      {/* WHY — bento with all five fills */}
      <section className="bg-paper">
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("whyEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
              {t("whyHeadline")}
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whys.map((w) => {
              const fillClass =
                w.fill === "pivot" ? "bg-osoul-pivot text-paper border-osoul-pivot" :
                w.fill === "deep" ? "bg-osoul-deep text-paper border-osoul-deep" :
                w.fill === "turquoise-soft" ? "bg-osoul-turquoise/[0.18] text-ink border-osoul-turquoise/30" :
                w.fill === "pivot-soft" ? "bg-osoul-pivot/[0.10] text-ink border-osoul-pivot/30" :
                w.fill === "parchment" ? "bg-parchment text-ink border-hairline" :
                "bg-paper text-ink border-hairline";
              const muted = w.fill === "pivot" || w.fill === "deep" ? "text-paper/85" : "text-ink/70";
              const mark = w.fill === "pivot" || w.fill === "deep" ? "text-paper/80" : "text-osoul-pivot/80";
              return (
                <article key={w.n} className={cn("rounded-[12px] border p-7 sm:p-8", fillClass)}>
                  <span aria-hidden="true" className={cn("numerals-tabular numerals-ltr text-xs font-medium tracking-[0.16em]", mark)}>
                    {String(w.n).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[clamp(1.125rem,1.6vw,1.375rem)] font-bold leading-tight">{w.t}</h3>
                  <p className={cn("mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed", muted)}>{w.b}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* AUDIENCE — color-fill on hover */}
      <section className="border-y border-hairline bg-parchment/40">
        <Container className="max-w-[1440px] py-20 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-osoul-deep">{t("audEyebrow")}</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
              {t("audHeadline")}
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {audiences.map((a) => {
              const hoverFill =
                a.tone === "pivot" ? "hover:bg-osoul-pivot hover:text-paper hover:border-osoul-pivot" :
                a.tone === "deep" ? "hover:bg-osoul-deep hover:text-paper hover:border-osoul-deep" :
                "hover:bg-osoul-turquoise hover:text-paper hover:border-osoul-turquoise";
              return (
                <Link
                  key={a.type}
                  href={{ pathname: "/register-interest", query: { type: a.type } }}
                  className={cn(
                    "group flex flex-col justify-between gap-10 rounded-[12px] border border-hairline bg-paper p-7 transition-colors duration-300 sm:p-9",
                    hoverFill,
                  )}
                >
                  <div>
                    <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-tight">{a.title}</h3>
                    <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-relaxed opacity-75">{a.body}</p>
                  </div>
                  <span aria-hidden="true" className="text-2xl rtl:scale-x-[-1]">→</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FINAL CTA — gradient at 110deg with Turquoise spotlight */}
      <section
        className="relative overflow-hidden text-paper"
        style={{ backgroundImage: "linear-gradient(110deg, #0F63A5 0%, #2391A0 60%, #31AE9C 100%)" }}
      >
        {/* Top-start Turquoise spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 h-[60vh] w-[60vw] start-[-10vw]"
          style={{
            background:
              "radial-gradient(circle, rgba(49,174,156,0.45), transparent 60%)",
          }}
        />
        <Container className="relative z-10 max-w-[1440px] py-24 sm:py-28 lg:py-36">
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/80">{t("finalKicker")}</p>
              <h2 className="mt-5 text-balance text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1] tracking-[-0.025em]">
                {t("finalHeadline")}
              </h2>
              <p className="mt-6 max-w-[58ch] text-pretty text-base font-light leading-relaxed text-paper/85 sm:text-lg lg:text-xl">
                {t("finalSub")}
              </p>
            </div>
            <div className="flex justify-start lg:col-span-4 lg:col-start-9 lg:justify-end">
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
    </>
  );
}
