import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";

type LegalArticleProps = {
  namespace: "Privacy" | "Terms" | "Risks";
  children: ReactNode;
};

export function LegalArticle({ namespace, children }: LegalArticleProps) {
  const t = useTranslations(namespace);
  const tLegal = useTranslations("Legal");
  return (
    <section className="bg-paper">
      <Container className="max-w-3xl py-20 sm:py-24 lg:py-28">
        <header className="animate-rise">
          <SectionEyebrow>{tLegal("policyEyebrow")}</SectionEyebrow>
          <h1 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-[60ch] text-pretty text-base leading-relaxed text-ink/75 sm:text-lg">
            {t("sub")}
          </p>
          <p className="mt-4 text-xs text-muted-ink">{tLegal("lastUpdated")}</p>
        </header>

        <div className="mt-12 space-y-12 lg:mt-16">{children}</div>
      </Container>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="animate-rise border-t border-hairline pt-10 first:border-t-0 first:pt-0">
      <h2 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-tight text-ink">
        {title}
      </h2>
      <div className="prose-osoul mt-5 space-y-4 text-[1rem] leading-relaxed text-ink/80">
        {children}
      </div>
    </article>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="numerals-tabular numerals-ltr mt-0.5 inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-parchment px-1.5 text-[0.7rem] font-medium text-osoul-deep"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
