import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "./SectionEyebrow";
import { cn } from "@/lib/utils";

type Tile = {
  title: string;
  body: string;
  surface: "paper" | "parchment";
  size: "hero" | "medium" | "small";
};

export function WhyUs() {
  const t = useTranslations("Why");

  const tiles: Tile[] = [
    {
      title: t("benefit1Title"),
      body: t("benefit1Body"),
      surface: "parchment",
      size: "hero",
    },
    {
      title: t("benefit2Title"),
      body: t("benefit2Body"),
      surface: "paper",
      size: "medium",
    },
    {
      title: t("benefit3Title"),
      body: t("benefit3Body"),
      surface: "paper",
      size: "medium",
    },
    {
      title: t("benefit4Title"),
      body: t("benefit4Body"),
      surface: "paper",
      size: "small",
    },
    {
      title: t("benefit5Title"),
      body: t("benefit5Body"),
      surface: "paper",
      size: "small",
    },
    {
      title: t("benefit6Title"),
      body: t("benefit6Body"),
      surface: "paper",
      size: "small",
    },
  ];

  return (
    <section id="why-us" className="bg-paper">
      <Container className="py-20 sm:py-24 lg:py-32">
        <header className="animate-rise max-w-2xl">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
            {t("headline")}
          </h2>
        </header>

        {/* Broken bento: hero card spans 2 cols × 2 rows on lg, two mediums stack beside,
            three smalls fill the row beneath. */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
          {tiles.map((tile, i) => (
            <article
              key={i}
              className={cn(
                "animate-rise group flex flex-col rounded-[10px] border border-hairline p-6 sm:p-7",
                tile.surface === "parchment" ? "bg-parchment" : "bg-paper",
                tile.size === "hero" &&
                  "lg:col-span-1 lg:row-span-2 lg:p-8 xl:p-10",
                tile.size === "medium" && "lg:col-span-2 lg:col-start-2",
                tile.size === "small" && "lg:col-span-1",
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                className="numerals-tabular numerals-ltr text-xs font-medium tracking-wider text-osoul-pivot/80"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={cn(
                  "mt-4 font-semibold text-ink",
                  tile.size === "hero"
                    ? "text-[clamp(1.5rem,2.4vw,1.875rem)] leading-tight"
                    : "text-lg leading-snug sm:text-xl",
                )}
              >
                {tile.title}
              </h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed text-ink/70",
                  tile.size === "hero" ? "text-base sm:text-[1.0625rem]" : "text-[0.95rem]",
                )}
              >
                {tile.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
