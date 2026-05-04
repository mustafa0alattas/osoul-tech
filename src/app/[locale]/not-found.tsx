import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="bg-paper">
      <Container className="flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-6 py-24">
        <span
          className="numerals-tabular numerals-ltr text-[clamp(3rem,6vw,5rem)] font-light leading-none text-osoul-pivot/70"
          aria-hidden="true"
        >
          404
        </span>
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-0.005em] text-ink">
          {t("headline")}
        </h1>
        <p className="max-w-prose text-base leading-relaxed text-ink/75">
          {t("body")}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-osoul-pivot px-5 text-paper hover:bg-osoul-pivot/90",
            )}
          >
            {t("backHome")}
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-hairline bg-paper px-5 text-ink hover:bg-parchment",
            )}
          >
            {t("contactUs")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
