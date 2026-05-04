import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "./SectionEyebrow";

export function HowItWorks() {
  const t = useTranslations("How");

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
    { title: t("step4Title"), body: t("step4Body") },
    { title: t("step5Title"), body: t("step5Body") },
  ];

  return (
    <section id="how" className="bg-paper">
      <Container className="py-20 sm:py-24 lg:py-32">
        <header className="animate-rise max-w-2xl">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.005em] text-ink">
            {t("headline")}
          </h2>
        </header>

        <ol className="mt-12 lg:mt-16">
          {steps.map((step, i) => (
            <li
              key={i}
              className="animate-rise grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-hairline py-7 first:border-t-0 first:pt-0 sm:gap-x-10 sm:py-9"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                className="numerals-tabular numerals-ltr -mt-2 select-none text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-none text-osoul-pivot/80"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 max-w-[60ch]">
                <h3 className="text-lg font-medium text-ink sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink/70">
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
