import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { RegisterInterestForm } from "@/components/forms/RegisterInterestForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "registerInterest" });
}

export default function RegisterInterestPage() {
  return (
    <Suspense fallback={null}>
      <RegisterInterestForm />
    </Suspense>
  );
}
