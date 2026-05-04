import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";

const DISPLAY_FONT =
  "var(--font-display-arabic), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif";

export function KhuzamaStats() {
  const t = useTranslations("Variant6");

  const stats = [
    { v: t("stat1Value"), u: t("stat1Unit"), l: t("stat1Label") },
    { v: t("stat2Value"), u: t("stat2Unit"), l: t("stat2Label") },
    { v: t("stat3Value"), u: t("stat3Unit"), l: t("stat3Label") },
    { v: t("stat4Value"), u: t("stat4Unit"), l: t("stat4Label") },
  ];

  return (
    <section className="bg-paper">
      <Container className="max-w-[1280px] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[58rem]">
          <p
            className="text-xs font-medium tracking-[0.18em]"
            style={{ color: "var(--khuzama-royal)" }}
          >
            {t("statsEyebrow")}
          </p>
          <h2
            className="mt-4 text-balance leading-[1.15]"
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              color: "var(--khuzama-deep)",
            }}
          >
            {t("statsHeadline")}
          </h2>
        </div>

        {/* Four columns separated by hairlines (1px). On mobile: 2x2 with hairlines. */}
        <div
          className="mx-auto mt-14 grid max-w-[58rem] grid-cols-2 gap-y-10 lg:mt-20 lg:grid-cols-4 lg:gap-y-0"
        >
          {stats.map((s, i) => (
            <article
              key={i}
              className="flex flex-col gap-3 px-5 sm:px-7"
              style={{
                borderInlineEnd:
                  i === stats.length - 1
                    ? undefined
                    : "1px solid color-mix(in oklab, var(--khuzama-royal) 35%, transparent)",
              }}
            >
              <div className="numerals-tabular numerals-ltr flex items-baseline gap-1">
                <span
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontWeight: 800,
                    fontSize: "clamp(3.5rem, 6.5vw, 6rem)",
                    lineHeight: 1,
                    color: "var(--khuzama-royal)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.v}
                </span>
                <span
                  className="text-3xl font-light"
                  style={{ color: "var(--khuzama-pivot)", opacity: 0.6 }}
                  aria-hidden="true"
                >
                  {s.u}
                </span>
              </div>
              <p className="max-w-[26ch] text-sm leading-relaxed text-muted-ink">
                {s.l}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
