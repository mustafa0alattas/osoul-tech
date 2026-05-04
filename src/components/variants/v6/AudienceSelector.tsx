import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";
import { SaduCorner } from "./SaduMotif";

const DISPLAY_FONT =
  "var(--font-display-arabic), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif";

type Audience = {
  type: "investor" | "owner" | "partner";
  title: string;
  body: string;
};

export function KhuzamaAudienceSelector() {
  const t = useTranslations("Variant6");

  const audiences: Audience[] = [
    { type: "investor", title: t("audInvestorTitle"), body: t("audInvestorBody") },
    { type: "owner", title: t("audOwnerTitle"), body: t("audOwnerBody") },
    { type: "partner", title: t("audPartnerTitle"), body: t("audPartnerBody") },
  ];

  return (
    <section className="bg-paper">
      <Container className="max-w-[1280px] py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[58rem] text-center">
          <p
            className="text-xs font-medium tracking-[0.18em]"
            style={{ color: "var(--khuzama-royal)" }}
          >
            {t("audEyebrow")}
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
            {t("audHeadline")}
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-20">
          {audiences.map((audience) => (
            <Link
              key={audience.type}
              href={{ pathname: "/register-interest", query: { type: audience.type } }}
              className="khuzama-aud-card group relative flex flex-col gap-6 overflow-hidden rounded-[10px] border border-hairline bg-parchment p-7 transition-colors duration-200 sm:p-8"
            >
              {/* Corner Sadu sigil */}
              <span
                aria-hidden="true"
                className="khuzama-aud-sigil absolute top-3 inline-flex transition-opacity duration-200 start-3"
              >
                <SaduCorner
                  size={22}
                  strokeColor="var(--khuzama-royal)"
                  opacity={0.18}
                  strokeWidth={1}
                />
              </span>

              <div className="mt-2">
                <h3
                  className="text-balance text-[clamp(1.375rem,2.2vw,1.75rem)] font-bold leading-tight"
                  style={{ color: "var(--khuzama-deep)" }}
                >
                  {audience.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                  {audience.body}
                </p>
              </div>

              <span
                className="khuzama-aud-arrow inline-flex items-center gap-2 text-sm font-medium transition-transform"
                style={{ color: "var(--khuzama-royal)" }}
              >
                <ArrowRight className="rtl-flip size-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Hover fill — Khuzama Royal background, Mist text. Co-located here so
          the cascade stays inside this variant; no global selector leaks. */}
      <style>{`
        [data-variant="khuzama"] .khuzama-aud-card:hover {
          background-color: var(--khuzama-royal);
          border-color: var(--khuzama-royal);
        }
        [data-variant="khuzama"] .khuzama-aud-card:hover h3,
        [data-variant="khuzama"] .khuzama-aud-card:hover .khuzama-aud-arrow {
          color: var(--khuzama-mist);
        }
        [data-variant="khuzama"] .khuzama-aud-card:hover p {
          color: rgba(230,224,244,0.85);
        }
        [data-variant="khuzama"] .khuzama-aud-card:hover .khuzama-aud-sigil { opacity: 0.5; }
      `}</style>
    </section>
  );
}
