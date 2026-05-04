import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import { SaduStrip } from "./SaduMotif";

const DISPLAY_FONT =
  "var(--font-display-arabic), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif";

export function KhuzamaHero() {
  const t = useTranslations("Variant6");
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "var(--khuzama-deep)" }}
    >
      {/* Iridescent conic shimmer — 40s rotation, reduced-motion stops it. */}
      <div
        aria-hidden="true"
        className="animate-khuzama-shimmer pointer-events-none absolute inset-0"
        style={{
          background:
            "conic-gradient(from var(--khuzama-shimmer-angle, 0deg) at 50% 50%, rgba(177,156,217,0.0) 0deg, rgba(177,156,217,0.18) 90deg, rgba(120,81,169,0.10) 180deg, rgba(177,156,217,0.18) 270deg, rgba(177,156,217,0.0) 360deg)",
          mixBlendMode: "screen",
        }}
      />

      <Container className="relative max-w-[1280px] py-24 sm:py-32 lg:py-40">
        <div className="mx-auto flex min-h-[60vh] max-w-[58rem] flex-col items-center justify-center text-center lg:min-h-[72vh]">
          {/* Issue / volume metadata */}
          <p
            className="text-[0.7rem] font-medium tracking-[0.22em]"
            style={{ color: "var(--khuzama-light)" }}
          >
            {t("issueLabel")}
          </p>

          {/* Eyebrow */}
          <p
            className="mt-10 text-[0.78rem] font-medium tracking-[0.18em]"
            style={{ color: "var(--khuzama-light)" }}
          >
            {t("heroEyebrow")}
          </p>

          {/* Display headline (Tajawal 800) */}
          <h1
            className="mt-7 text-balance leading-[1.05]"
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              color: "var(--khuzama-mist)",
              letterSpacing: 0,
            }}
          >
            {t("heroHeadline")}
          </h1>

          {/* Sadu hairline strip — full-bleed accent below headline */}
          <div className="mt-12 w-full sm:mt-16">
            <SaduStrip
              height={12}
              strokeColor="var(--khuzama-light)"
              opacity={0.18}
              strokeWidth={1}
            />
          </div>

          {/* Subhead */}
          <p
            className="mt-12 max-w-[55ch] text-pretty text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--khuzama-mist)", opacity: 0.85 }}
          >
            {t("heroSub")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
            <Link
              href="/register-interest"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-7 text-[0.95rem] font-semibold shadow-rest transition-colors",
              )}
              style={{
                backgroundColor: "var(--khuzama-mist)",
                color: "var(--khuzama-deep)",
              }}
            >
              {t("primaryCta")}
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border bg-transparent px-7 text-[0.95rem] font-medium transition-colors",
              )}
              style={{
                borderColor: "var(--khuzama-mist)",
                color: "var(--khuzama-mist)",
              }}
            >
              {t("secondaryCta")}
            </Link>
          </div>

          {/* REGA badge */}
          <div
            className="mt-10 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{
              borderColor: "rgba(230,224,244,0.25)",
              backgroundColor: "rgba(230,224,244,0.08)",
            }}
          >
            <ShieldCheck
              className="size-3.5"
              style={{ color: "var(--khuzama-light)" }}
              aria-hidden="true"
            />
            <span
              className="text-xs"
              style={{ color: "var(--khuzama-mist)", opacity: 0.85 }}
            >
              {t("trustBadge")}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
