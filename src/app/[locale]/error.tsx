"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: ErrorPageProps) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[osoul] route error:", error);
    }
  }, [error]);

  return (
    <section className="bg-paper">
      <Container className="flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-6 py-24">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-0.005em] text-ink">
          {t("headline")}
        </h1>
        <p className="max-w-prose text-base leading-relaxed text-ink/75">
          {t("body")}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-osoul-pivot px-5 text-paper hover:bg-osoul-pivot/90",
            )}
          >
            {t("tryAgain")}
          </button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-hairline bg-paper px-5 text-ink hover:bg-parchment",
            )}
          >
            {t("backHome")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
