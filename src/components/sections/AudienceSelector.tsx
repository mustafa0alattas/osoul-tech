import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "./SectionEyebrow";
import { ArrowRight } from "lucide-react";

type Card = {
  title: string;
  body: string;
  type: "investor" | "owner" | "partner";
};

export function AudienceSelector() {
  const t = useTranslations("Audience");

  const cards: Card[] = [
    { title: t("investorTitle"), body: t("investorBody"), type: "investor" },
    { title: t("ownerTitle"), body: t("ownerBody"), type: "owner" },
    { title: t("partnerTitle"), body: t("partnerBody"), type: "partner" },
  ];

  return (
    <section className="bg-paper">
      <Container className="py-20 sm:py-24 lg:py-32">
        <header className="animate-rise max-w-2xl">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
            {t("headline")}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Link
              key={card.type}
              href={{
                pathname: "/register-interest",
                query: { type: card.type },
              }}
              className="animate-rise group flex flex-col justify-between gap-8 rounded-[10px] border border-hairline bg-paper p-7 transition-all hover:border-osoul-pivot/40 hover:shadow-lift sm:p-8"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div>
                <span
                  className="numerals-tabular numerals-ltr text-xs font-medium tracking-wider text-osoul-pivot/80"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                  {card.body}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-osoul-pivot transition-colors group-hover:text-osoul-deep">
                <ArrowRight
                  className="rtl-flip size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
