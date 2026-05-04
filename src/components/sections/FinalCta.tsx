import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  const t = useTranslations("FinalCta");
  const c = useTranslations("CTA");

  return (
    <section className="bg-osoul-gradient relative overflow-hidden">
      <Container className="flex flex-col items-center gap-7 py-24 text-center sm:py-28 lg:py-32">
        <h2 className="animate-rise max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.01em] text-paper">
          {t("headline")}
        </h2>
        <p className="animate-rise max-w-xl text-pretty text-base leading-relaxed text-paper/90 sm:text-lg">
          {t("sub")}
        </p>
        <Link
          href="/register-interest"
          className={cn(
            buttonVariants({ size: "lg" }),
            "animate-rise h-12 bg-paper px-7 text-[0.95rem] font-semibold text-osoul-deep shadow-rest hover:bg-paper/90",
          )}
        >
          {c("registerInterest")}
        </Link>
      </Container>
    </section>
  );
}
