import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

/**
 * Shared metadata factory for all five exploration variants.
 * Reuses the home SEO copy but stamps `noindex` and clears the canonical
 * so variants never compete with the canonical home in search.
 */
export async function variantMetadata(locale: string): Promise<Metadata> {
  const base = await buildMetadata({ locale, page: "home" });
  return {
    ...base,
    robots: { index: false, follow: true },
    alternates: {
      ...base.alternates,
      canonical: undefined,
    },
  };
}
