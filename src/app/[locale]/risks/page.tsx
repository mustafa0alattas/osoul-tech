import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import {
  LegalArticle,
  LegalList,
  LegalSection,
} from "@/components/sections/shared/LegalArticle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "risks" });
}

export default function RisksPage() {
  const t = useTranslations("Risks");
  return (
    <LegalArticle namespace="Risks">
      <LegalSection title={t("s1Title")}>
        <p>{t("s1Body")}</p>
      </LegalSection>

      <LegalSection title={t("s2Title")}>
        <p>{t("s2Body")}</p>
      </LegalSection>

      <LegalSection title={t("s3Title")}>
        <p>{t("s3Body")}</p>
      </LegalSection>

      <LegalSection title={t("s4Title")}>
        <LegalList items={[t("s4List1"), t("s4List2"), t("s4List3")]} />
      </LegalSection>

      <LegalSection title={t("s5Title")}>
        <p>{t("s5Body")}</p>
      </LegalSection>

      <LegalSection title={t("s6Title")}>
        <p>{t("s6Body")}</p>
      </LegalSection>

      <LegalSection title={t("s7Title")}>
        <LegalList
          items={[t("s7List1"), t("s7List2"), t("s7List3"), t("s7List4")]}
        />
      </LegalSection>
    </LegalArticle>
  );
}
