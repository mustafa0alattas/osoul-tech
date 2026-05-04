import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SaduMedallion } from "./SaduMotif";

const DISPLAY_FONT =
  "var(--font-display-arabic), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif";

export function KhuzamaHowItWorks() {
  const t = useTranslations("Variant6");

  const steps = [1, 2, 3, 4, 5].map((i) => ({
    n: i,
    title: t(`step${i}Title`),
    body: t(`step${i}Body`),
  }));

  return (
    <section style={{ backgroundColor: "var(--khuzama-mist)" }}>
      <Container className="max-w-[1280px] py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[58rem] text-center">
          <p
            className="text-xs font-medium tracking-[0.18em]"
            style={{ color: "var(--khuzama-royal)" }}
          >
            {t("howEyebrow")}
          </p>
          <h2
            className="mt-4 text-balance leading-[1.15]"
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 900,
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              color: "var(--khuzama-deep)",
            }}
          >
            {t("howHeadline")}
          </h2>
        </div>

        {/* Vertical procession — medallions linked by a hairline thread.
            Hairline runs behind the medallions via a centered absolute pseudo. */}
        <ol
          className="relative mx-auto mt-16 max-w-[40rem] space-y-12 sm:mt-20 sm:space-y-14"
          aria-label={t("howEyebrow")}
        >
          {/* Vertical thread — drawn behind the medallions, stops short of edges */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-8 bottom-8 start-1/2 w-px -translate-x-1/2"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--khuzama-royal) 30%, transparent)",
            }}
          />

          {steps.map((step, i) => (
            <li
              key={step.n}
              data-reveal
              className="relative z-10 flex flex-col items-center gap-5 text-center"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Medallion */}
              <div
                className="relative flex size-[60px] shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--khuzama-mist) 55%, white)",
                  boxShadow:
                    "0 0 0 1px color-mix(in oklab, var(--khuzama-royal) 35%, transparent)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <SaduMedallion
                    size={50}
                    strokeColor="var(--khuzama-royal)"
                    opacity={0.18}
                    strokeWidth={1}
                  />
                </span>
                <span
                  className="numerals-tabular numerals-ltr relative"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "var(--khuzama-deep)",
                  }}
                >
                  {String(step.n).padStart(2, "0")}
                </span>
              </div>

              <div className="max-w-[42ch]">
                <h3
                  className="text-lg font-bold"
                  style={{ color: "var(--khuzama-deep)" }}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
