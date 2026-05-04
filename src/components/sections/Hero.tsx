import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("Hero");
  const c = useTranslations("CTA");

  return (
    <section className="relative overflow-hidden bg-paper">
      <Container className="grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
        {/* Leading column */}
        <div className="animate-rise lg:col-span-7">
          <div className="inline-flex items-start gap-2 rounded-full border border-hairline bg-parchment/70 px-3 py-1.5">
            <ShieldCheck
              className="mt-0.5 size-3.5 shrink-0 text-osoul-pivot"
              aria-hidden="true"
            />
            <span className="text-xs leading-snug text-muted-ink">
              {t("trustBadge")}
            </span>
          </div>

          <h1 className="mt-7 text-balance text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.01em] text-ink">
            {t("headline")}
          </h1>

          <p className="mt-6 max-w-[60ch] text-pretty text-base leading-relaxed text-ink/75 sm:text-lg">
            {t("subheadline")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/register-interest"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 gap-2 bg-osoul-pivot px-6 text-[0.95rem] font-semibold text-paper shadow-rest transition-colors hover:bg-osoul-pivot/90",
              )}
            >
              <span>{c("registerInterest")}</span>
              <ArrowRight
                className="rtl-flip size-4"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-hairline bg-paper px-6 text-[0.95rem] font-medium text-ink hover:bg-parchment",
              )}
            >
              {c("learnMore")}
            </Link>
          </div>
        </div>

        {/* Trailing column — typographic mark, not a hero image. */}
        <div
          className="animate-rise relative hidden lg:col-span-5 lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex flex-col items-end justify-between py-2">
            {/* Top: cohort tag */}
            <div className="flex flex-col items-end gap-1 text-end">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-ink">
                {t("cohortLabel")}
              </span>
              <span className="numerals-tabular numerals-ltr text-[0.85rem] font-medium text-ink/70">
                {t("cohortDate")}
              </span>
            </div>

            {/* Center: oversize typographic mark, Pivot at low opacity so it reads as a watermark
                rather than a second wordmark — the gradient cap is reserved for header + final CTA. */}
            <div className="flex w-full items-center justify-end">
              <span className="text-[clamp(4rem,10vw,8rem)] font-bold leading-none tracking-tight text-osoul-pivot/15">
                أصول
              </span>
            </div>

            {/* Bottom: scale ladder */}
            <div className="flex flex-col items-end gap-2 text-end">
              <div className="numerals-tabular numerals-ltr flex items-baseline gap-2 text-ink/60">
                <span className="text-3xl font-light">01</span>
                <span className="text-base text-muted-ink">/</span>
                <span className="text-base text-muted-ink">04</span>
              </div>
              <span className="h-px w-24 bg-hairline" />
            </div>
          </div>
          {/* Reserve column height */}
          <div className="invisible h-[28rem]" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
