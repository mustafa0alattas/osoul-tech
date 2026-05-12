import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { KhuzamaHero } from "@/components/sections/home-khuzama/Hero";
import { KhuzamaHowItWorks } from "@/components/sections/home-khuzama/HowItWorks";
import { KhuzamaWhyUs } from "@/components/sections/home-khuzama/WhyUs";
import { KhuzamaOpportunities } from "@/components/sections/home-khuzama/Opportunities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "home" });
}

export default function HomePage() {
  return (
    <>
      <KhuzamaHero />
      <KhuzamaHowItWorks />
      <KhuzamaWhyUs />
      <KhuzamaOpportunities />
    </>
  );
}
