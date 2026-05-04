import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { variantMetadata } from "@/components/variants/metadata";
import { NajdiMotif, NajdiDivider } from "@/components/variants/v4/NajdiMotif";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║ Variant /4 — Najdi Modern                                           ║
   ║ Procedural six-fold geometric motif (hairline strokes) repeated as  ║
   ║ section dividers + a single oversize hero anchor at -30% bleed.     ║
   ║ Plex 500 dominant, classical centered symmetry, no italic, dignified║
   ║ Layout: classical · Color: Parchment+Deep · Hero: pattern+type      ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return variantMetadata(locale);
}

export default function NajdiModern() {
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
    <main className="bg-parchment/40">
      {/* HERO — single oversize motif anchored at -30% bleed, centered headline */}
      <section className="relative isolate overflow-hidden bg-parchment/40">
        <div className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-start">
          <div
            aria-hidden="true"
            style={{
              transform: "translateX(-30%)",
              width: "180vmin",
              height: "180vmin",
            }}
          >
            <NajdiMotif size={1200} stroke="#2391A0" opacity={0.08} strokeWidth={0.4} className="h-full w-full" />
          </div>
        </div>

        <Container className="relative z-10 max-w-[1280px]">
          <div className="grid min-h-[80vh] place-items-center py-28 text-center sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[58rem]">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-osoul-deep">
                {t("trustBadge")}
              </p>
              <h1
                className="mt-8 text-balance leading-[1.05] tracking-[0.005em] text-osoul-deep"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500 }}
              >
                {t("headline")}
              </h1>
              <p className="mx-auto mt-8 max-w-[58ch] text-pretty text-base leading-relaxed text-ink/75 sm:text-lg" style={{ fontWeight: 400 }}>
                {t("subheadline")}
              </p>
              <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-3">
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
                    "h-12 border-osoul-deep/30 bg-transparent px-7 text-[0.95rem] font-medium text-osoul-deep hover:bg-osoul-deep/[0.05]",
                  )}
                >
                  {t("secondaryCta")}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS — hairline grid with motif marks above each numeral */}
      <Container className="max-w-[1280px]">
        <NajdiDivider className="py-10" motifSize={36} />
      </Container>
      <section className="bg-paper">
        <Container className="max-w-[1280px] py-20 sm:py-24 lg:py-28">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-osoul-deep">{t("statsEyebrow")}</p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-ink" style={{ fontWeight: 500, letterSpacing: "0.005em" }}>
              {t("statsHeadline")}
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-px bg-hairline lg:grid-cols-4">
            {stats.map((s, i) => (
              <article key={i} className="flex flex-col items-center gap-4 bg-paper p-8 text-center sm:p-10">
                <NajdiMotif size={28} stroke="#2391A0" opacity={0.6} strokeWidth={0.8} />
                <div className="flex items-baseline gap-1">
                  <span className="numerals-tabular numerals-ltr text-[clamp(2.75rem,5vw,4.5rem)] leading-none tracking-[-0.02em] text-osoul-deep" style={{ fontWeight: 500 }}>
                    {s.v}
                  </span>
                  <span aria-hidden="true" className="numerals-ltr text-2xl text-osoul-pivot/70" style={{ fontWeight: 300 }}>
                    {s.u}
                  </span>
                </div>
                <p className="max-w-[24ch] text-sm leading-relaxed text-ink/65">{s.l}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW — vertical procession, all centered, hairline thread, motif medallions */}
      <Container className="max-w-[1280px]">
        <NajdiDivider className="py-10" motifSize={36} />
      </Container>
      <section className="bg-parchment/30">
        <Container className="max-w-[1280px] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[40rem] text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-osoul-deep">{t("howEyebrow")}</p>
            <h2 className="mt-4 text-[clamp(1.875rem,3.5vw,3rem)] leading-tight text-ink" style={{ fontWeight: 500, letterSpacing: "0.005em" }}>
              {t("howHeadline")}
            </h2>
          </div>

          <ol className="relative mx-auto mt-16 max-w-[36rem]">
            <span aria-hidden="true" className="absolute top-0 h-full w-px bg-hairline left-1/2 -translate-x-1/2" />
            {steps.map((s, i) => (
              <li key={s.n} className="relative flex flex-col items-center text-center" style={{ paddingTop: i === 0 ? 0 : "3rem", paddingBottom: i === steps.length - 1 ? 0 : "3rem" }}>
                <div className="relative inline-flex size-16 items-center justify-center rounded-full border border-hairline bg-paper">
                  <NajdiMotif size={26} stroke="#0F63A5" opacity={0.55} strokeWidth={0.8} />
                  <span aria-hidden="true" className="numerals-tabular numerals-ltr absolute -bottom-7 text-xs font-medium text-osoul-deep">
                    {String(s.n).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-12 text-[clamp(1.125rem,1.7vw,1.5rem)] leading-tight text-ink" style={{ fontWeight: 700 }}>
                  {s.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[40ch] text-base leading-relaxed text-ink/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* WHY — 3x2 cards on Parchment with corner motif marks */}
      <Container className="max-w-[1280px]">
        <NajdiDivider className="py-10" motifSize={36} />
      </Container>
      <section className="bg-paper">
        <Container className="max-w-[1280px] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[40rem] text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-osoul-deep">{t("whyEyebrow")}</p>
            <h2 className="mt-4 text-[clamp(1.875rem,3.5vw,3rem)] leading-tight text-ink" style={{ fontWeight: 500, letterSpacing: "0.005em" }}>
              {t("whyHeadline")}
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whys.map((w) => (
              <article key={w.n} className="relative rounded-[8px] border border-hairline bg-parchment p-7 sm:p-8">
                {/* Corner motif mark, top-start */}
                <div aria-hidden="true" className="pointer-events-none absolute top-3 start-3">
                  <NajdiMotif size={24} stroke="#0F63A5" opacity={0.35} strokeWidth={0.8} />
                </div>
                <span aria-hidden="true" className="numerals-tabular numerals-ltr text-xs font-medium tracking-[0.16em] text-osoul-deep/70">
                  {String(w.n).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[1.0625rem] leading-tight text-ink" style={{ fontWeight: 700 }}>{w.title}</h3>
                <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink/70">{w.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA — Pivot, classically centered */}
      <Container className="max-w-[1280px]">
        <NajdiDivider className="py-10" motifSize={36} />
      </Container>
      <section className="bg-osoul-pivot text-paper">
        <Container className="max-w-[1280px] py-24 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[58rem] text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-paper/80">{t("finalKicker")}</p>
            <h2 className="mt-5 text-balance text-[clamp(2.25rem,5vw,4rem)] leading-[1.05]" style={{ fontWeight: 500, letterSpacing: "0.005em" }}>
              {t("finalHeadline")}
            </h2>
            <p className="mx-auto mt-6 max-w-[55ch] text-pretty text-base leading-relaxed text-paper/85 sm:text-lg">
              {t("finalSub")}
            </p>
            <div className="mt-10">
              <Link
                href="/register-interest"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 bg-paper px-8 text-[0.95rem] font-semibold text-osoul-pivot hover:bg-paper/95",
                )}
              >
                {t("finalCta")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER HORIZON — full-width procession of motifs at 4% tint */}
      <div aria-hidden="true" className="overflow-hidden bg-parchment/40 py-6">
        <div className="flex items-center justify-center gap-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <NajdiMotif key={i} size={20} stroke="#0F63A5" opacity={0.18} strokeWidth={0.7} />
          ))}
        </div>
      </div>
    </main>
  );
}
