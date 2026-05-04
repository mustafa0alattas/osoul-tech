"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";

export type FaqEntry = {
  id: string;
  q: string;
  a: string;
};

export type FaqCategory = {
  id: string;
  label: string;
  items: FaqEntry[];
};

type FaqListProps = {
  eyebrow: string;
  headline: string;
  sub: string;
  searchPlaceholder: string;
  noResults: string;
  categories: FaqCategory[];
};

function normalize(s: string) {
  // Lowercase + strip Arabic diacritics for forgiving search.
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, "")
    .normalize("NFKC");
}

export function FaqList({
  eyebrow,
  headline,
  sub,
  searchPlaceholder,
  noResults,
  categories,
}: FaqListProps) {
  const [query, setQuery] = useState("");
  const locale = useLocale();
  const trimmed = query.trim();
  const needle = trimmed ? normalize(trimmed) : "";

  const filtered = useMemo(() => {
    if (!needle) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((it) => normalize(it.q).includes(needle)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, needle]);

  const totalMatches = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      {/* Hero with search */}
      <section className="bg-paper">
        <Container className="animate-rise max-w-4xl py-20 sm:py-24 lg:py-28">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
            {headline}
          </h1>
          <p className="mt-6 max-w-[60ch] text-pretty text-base leading-relaxed text-ink/75 sm:text-lg">
            {sub}
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search
              className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-ink start-3.5"
              aria-hidden="true"
            />
            <Input
              type="search"
              dir={locale === "ar" ? "rtl" : "ltr"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-12 rounded-[10px] border-hairline bg-paper text-base shadow-rest ps-10 pe-10 placeholder:text-muted-ink/80 focus-visible:border-osoul-pivot focus-visible:ring-osoul-pivot/30"
            />
            {trimmed ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="clear search"
                className="absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-ink transition-colors hover:bg-parchment hover:text-ink end-1 sm:size-8 sm:end-2"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="border-t border-hairline bg-parchment">
        <Container className="py-16 sm:py-20 lg:py-24">
          {filtered.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-[10px] border border-hairline bg-paper p-8 text-center">
              <p className="text-base leading-relaxed text-ink/75">
                {noResults}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-16 lg:gap-20">
              {filtered.map((cat) => (
                <div key={cat.id}>
                  <header className="mb-6 flex items-baseline gap-3">
                    <span
                      className="numerals-tabular numerals-ltr text-xs font-medium uppercase tracking-[0.16em] text-osoul-deep"
                      aria-hidden="true"
                    >
                      {cat.id.toUpperCase()}
                    </span>
                    <h2 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold text-ink">
                      {cat.label}
                    </h2>
                  </header>
                  <Accordion className="overflow-hidden rounded-[10px] border border-hairline bg-paper">
                    {cat.items.map((it) => (
                      <AccordionItem
                        key={it.id}
                        value={it.id}
                        className="border-hairline px-5 sm:px-6"
                      >
                        <AccordionTrigger className="py-5 text-[1rem] font-medium text-ink hover:no-underline sm:text-[1.0625rem]">
                          {it.q}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-[0.95rem] leading-relaxed text-ink/75">
                            {it.a}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
              {trimmed ? (
                <p className="text-center text-xs text-muted-ink">
                  <span className="numerals-tabular numerals-ltr">
                    {totalMatches}
                  </span>
                </p>
              ) : null}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
