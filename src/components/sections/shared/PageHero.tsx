import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "../SectionEyebrow";

type PageHeroProps = {
  eyebrow: string;
  headline: string;
  sub?: string;
};

export function PageHero({ eyebrow, headline, sub }: PageHeroProps) {
  return (
    <section className="bg-paper">
      <Container className="animate-rise max-w-4xl py-20 sm:py-24 lg:py-28">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
          {headline}
        </h1>
        {sub ? (
          <p className="mt-6 max-w-[60ch] text-pretty text-base leading-relaxed text-ink/75 sm:text-lg">
            {sub}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
