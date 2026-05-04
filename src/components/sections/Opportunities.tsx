import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "./SectionEyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Opportunities() {
  const t = useTranslations("Opportunities");
  const c = useTranslations("CTA");

  const cards = [
    { city: t("card1City"), type: t("card1Type"), ret: t("card1Return") },
    { city: t("card2City"), type: t("card2Type"), ret: t("card2Return") },
    { city: t("card3City"), type: t("card3Type"), ret: t("card3Return") },
  ];

  return (
    <section className="border-y border-hairline bg-parchment">
      <Container className="py-20 sm:py-24 lg:py-32">
        <header className="animate-rise max-w-2xl">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
            {t("headline")}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={i}
              className="animate-rise flex flex-col overflow-hidden rounded-[10px] border border-hairline bg-paper"
              style={{ animationDelay: `${i * 60}ms` }}
              aria-label={`${card.city} · ${card.type}`}
            >
              {/* Typographic plate (no photo) */}
              <div className="relative flex h-44 items-center justify-center border-b border-hairline bg-parchment/60 sm:h-52">
                <span className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-ink/85">
                  {card.city}
                </span>
                <span
                  className="absolute end-3 top-3 inline-flex items-center rounded-full bg-paper px-2.5 py-1 text-[0.7rem] font-medium text-osoul-pivot ring-1 ring-osoul-pivot/15"
                  aria-label={t("comingSoon")}
                >
                  {t("comingSoon")}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
                <p className="text-[0.95rem] text-ink/75">{card.type}</p>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-xs text-muted-ink">
                    {t("expectedReturn")}
                  </span>
                  <span
                    className="numerals-tabular numerals-ltr text-2xl font-semibold tracking-tight text-osoul-deep"
                    aria-label={`${t("expectedReturn")} ${card.ret}`}
                  >
                    {card.ret}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="animate-rise mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-base text-ink/75">{t("ctaBelow")}</p>
          <Link
            href="/register-interest"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-osoul-pivot px-6 text-[0.95rem] font-semibold text-paper hover:bg-osoul-pivot/90",
            )}
          >
            {c("registerInterest")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
