import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SaduCorner } from "./SaduMotif";

const DISPLAY_FONT =
  "var(--font-display-arabic), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif";

export function KhuzamaWhyUs() {
  const t = useTranslations("Variant6");

  const reasons = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: t(`why${i}Title`),
    body: t(`why${i}Body`),
  }));

  return (
    <section className="bg-paper">
      <Container className="max-w-[1280px] py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[58rem]">
          <p
            className="text-xs font-medium tracking-[0.18em]"
            style={{ color: "var(--khuzama-royal)" }}
          >
            {t("whyEyebrow")}
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
            {t("whyHeadline")}
          </h2>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink/75">
            {t("whyLead")}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 2xl:grid-cols-6">
          {reasons.map((reason, i) => (
            <article
              key={i}
              className="relative flex flex-col gap-4 overflow-hidden rounded-[10px] border border-hairline bg-parchment p-6 sm:p-7"
              style={{
                borderTopWidth: "3px",
                borderTopColor: "var(--khuzama-royal)",
              }}
            >
              {/* Corner Sadu sigil */}
              <span
                aria-hidden="true"
                className="absolute top-3 inline-flex start-3"
              >
                <SaduCorner
                  size={20}
                  strokeColor="var(--khuzama-royal)"
                  opacity={0.18}
                  strokeWidth={1}
                />
              </span>

              <span
                className="numerals-tabular numerals-ltr text-xs font-medium tracking-wider"
                style={{ color: "var(--khuzama-pivot)", opacity: 0.85 }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-lg font-bold leading-snug"
                style={{ color: "var(--khuzama-deep)" }}
              >
                {reason.title}
              </h3>
              <p
                className="text-[0.95rem] text-ink/75"
                style={{ lineHeight: 1.7 }}
              >
                {reason.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
