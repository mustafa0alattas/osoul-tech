import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SaduStrip } from "./SaduMotif";

const DISPLAY_FONT =
  "var(--font-display-arabic), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif";

export function KhuzamaOpportunities() {
  const t = useTranslations("Variant6");

  const cards = [
    { city: t("opp1City"), type: t("opp1Type"), ret: t("opp1Return") },
    { city: t("opp2City"), type: t("opp2Type"), ret: t("opp2Return") },
    { city: t("opp3City"), type: t("opp3Type"), ret: t("opp3Return") },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--khuzama-deep)" }}
    >
      <Container className="relative max-w-[1280px] py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[58rem]">
          <p
            className="text-xs font-medium tracking-[0.18em]"
            style={{ color: "var(--khuzama-light)" }}
          >
            {t("oppsEyebrow")}
          </p>
          <h2
            className="mt-4 text-balance leading-[1.15]"
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 900,
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              color: "var(--khuzama-mist)",
            }}
          >
            {t("oppsHeadline")}
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={i}
              className="relative flex flex-col overflow-hidden rounded-[10px]"
              style={{ backgroundColor: "var(--khuzama-mist)" }}
              aria-label={`${card.city} · ${card.type}`}
            >
              {/* Sadu top divider */}
              <SaduStrip
                height={10}
                strokeColor="var(--khuzama-royal)"
                opacity={0.4}
                strokeWidth={1}
              />

              <div className="flex h-40 items-center justify-center sm:h-44">
                <span
                  className="text-balance text-center"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    color: "var(--khuzama-deep)",
                    letterSpacing: 0,
                  }}
                >
                  {card.city}
                </span>
                <span
                  className="absolute end-3 top-5 inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-medium"
                  style={{
                    backgroundColor:
                      "color-mix(in oklab, var(--khuzama-royal) 12%, var(--khuzama-mist))",
                    color: "var(--khuzama-royal)",
                  }}
                  aria-label={t("comingSoon")}
                >
                  {t("comingSoon")}
                </span>
              </div>

              <div
                className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6"
                style={{
                  borderTop:
                    "1px solid color-mix(in oklab, var(--khuzama-royal) 25%, transparent)",
                }}
              >
                <p className="text-[0.95rem]" style={{ color: "var(--khuzama-deep)", opacity: 0.8 }}>
                  {card.type}
                </p>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-xs" style={{ color: "var(--khuzama-pivot)" }}>
                    {t("expectedReturn")}
                  </span>
                  <span
                    className="numerals-tabular numerals-ltr"
                    style={{
                      fontFamily: DISPLAY_FONT,
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "var(--khuzama-royal)",
                      letterSpacing: "-0.01em",
                    }}
                    aria-label={`${t("expectedReturn")} ${card.ret}`}
                  >
                    {card.ret}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <p
            className="max-w-xl text-base"
            style={{ color: "var(--khuzama-mist)", opacity: 0.85 }}
          >
            {t("oppsCtaBelow")}
          </p>
          <Link
            href="/register-interest"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-7 text-[0.95rem] font-semibold transition-colors",
            )}
            style={{
              backgroundColor: "var(--khuzama-mist)",
              color: "var(--khuzama-deep)",
            }}
          >
            {t("primaryCta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
