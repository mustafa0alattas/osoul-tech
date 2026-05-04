import type { Metadata } from "next";
import { variantMetadata } from "@/components/variants/metadata";
import { KhuzamaHero } from "@/components/variants/v6/Hero";
import { KhuzamaStats } from "@/components/variants/v6/Stats";
import { KhuzamaHowItWorks } from "@/components/variants/v6/HowItWorks";
import { KhuzamaWhyUs } from "@/components/variants/v6/WhyUs";
import { KhuzamaOpportunities } from "@/components/variants/v6/Opportunities";
import { KhuzamaAudienceSelector } from "@/components/variants/v6/AudienceSelector";
import { KhuzamaFinalCta } from "@/components/variants/v6/FinalCta";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║ Variant /6 — Saudi Royal Khuzama (الخزامى الملكي)                   ║
   ║                                                                      ║
   ║ A deliberate, scoped exception to PRODUCT.md's anti-reference        ║
   ║ against purple/violet. Khuzama (lavender) is the official Saudi      ║
   ║ ceremonial color adopted by Royal Protocol in 2021 for state         ║
   ║ reception carpets, and the primary brand color of Riyadh Air.        ║
   ║ It is not a Western SaaS purple — it is a Saudi cultural signature.  ║
   ║                                                                      ║
   ║ The exception is contained: all khuzama tokens are scoped under      ║
   ║ [data-variant="khuzama"] in globals.css, the Tajawal display font    ║
   ║ is loaded only by this segment's layout, and no other route imports  ║
   ║ from src/components/variants/v6/.                                    ║
   ║                                                                      ║
   ║ Personality: ceremonial, dignified, warmly Saudi. The page reads     ║
   ║ like an invitation to step onto the lavender carpet at the Royal     ║
   ║ Diwan — measured, generous in scale, deliberately Saudi in its       ║
   ║ visual language. Sadu (السدو) weaving motifs appear as procedural    ║
   ║ SVG hairlines, not as imagery.                                       ║
   ║                                                                      ║
   ║ Layout: ceremonial-symmetric · Color: ALL KHUZAMA · Hero: textile    ║
   ║ Type: Tajawal display + Plex body · Motion: conic shimmer 40s        ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return variantMetadata(locale);
}

export default function SaudiRoyalKhuzama() {
  return (
    <>
      <KhuzamaHero />
      <KhuzamaStats />
      <KhuzamaHowItWorks />
      <KhuzamaWhyUs />
      <KhuzamaOpportunities />
      <KhuzamaAudienceSelector />
      <KhuzamaFinalCta />
    </>
  );
}
