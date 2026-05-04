import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SaduStrip } from "./SaduMotif";

const DISPLAY_FONT =
  "var(--font-display-arabic), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif";

export function KhuzamaFinalCta() {
  const t = useTranslations("Variant6");

  return (
    <section className="bg-khuzama-gradient relative overflow-hidden">
      <Container className="relative max-w-[1280px] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <p
            className="text-[0.7rem] font-medium tracking-[0.22em]"
            style={{ color: "var(--khuzama-mist)", opacity: 0.85 }}
          >
            {t("finalKicker")}
          </p>
          <h2
            className="text-balance leading-[1.05]"
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "#FBFAF7",
            }}
          >
            {t("finalHeadline")}
          </h2>
          <p
            className="max-w-xl text-pretty text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--khuzama-mist)", opacity: 0.92 }}
          >
            {t("finalSub")}
          </p>
          <Link
            href="/register-interest"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-7 text-[0.95rem] font-semibold shadow-rest transition-colors",
            )}
            style={{
              backgroundColor: "#FBFAF7",
              color: "var(--khuzama-deep)",
            }}
          >
            {t("finalCta")}
          </Link>
        </div>
      </Container>

      {/* Sadu tiled overlay across the bottom 30% — 4% white opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
        style={{ color: "white" }}
      >
        <div className="flex h-full flex-col justify-end gap-1 opacity-[0.04]">
          <SaduStrip height={10} strokeColor="white" opacity={1} strokeWidth={1} />
          <SaduStrip height={10} strokeColor="white" opacity={1} strokeWidth={1} />
          <SaduStrip height={10} strokeColor="white" opacity={1} strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
