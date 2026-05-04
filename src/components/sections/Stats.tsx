import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";

export function Stats() {
  const t = useTranslations("Stats");

  const tiles = [
    { value: t("tile1Value"), label: t("tile1Label"), isNumeric: true },
    { value: t("tile2Value"), label: t("tile2Label"), isNumeric: false },
    { value: t("tile3Value"), label: t("tile3Label"), isNumeric: false },
    { value: t("tile4Value"), label: t("tile4Label"), isNumeric: false },
  ];

  return (
    <section className="border-y border-hairline bg-parchment">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:py-16 lg:grid-cols-4 lg:py-20">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className="animate-rise flex flex-col gap-1.5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              className={
                tile.isNumeric
                  ? "numerals-tabular numerals-ltr text-[clamp(2.5rem,4.5vw,3.5rem)] font-medium leading-none tracking-[-0.02em] text-osoul-deep"
                  : "text-[clamp(1.25rem,2vw,1.625rem)] font-semibold leading-tight text-ink"
              }
            >
              {tile.value}
            </span>
            <span className="text-sm leading-snug text-muted-ink">
              {tile.label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
