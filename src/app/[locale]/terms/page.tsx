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
  return buildMetadata({ locale, page: "terms" });
}

export default function TermsPage() {
  const t = useTranslations("Terms");
  return (
    <LegalArticle namespace="Terms">
      <LegalSection title={t("s1Title")}>
        <p>{t("s1Body")}</p>
      </LegalSection>

      <LegalSection title={t("s2Title")}>
        <p>{t("s2Body")}</p>
      </LegalSection>

      <LegalSection title={t("s3Title")}>
        <LegalList
          items={[t("s3List1"), t("s3List2"), t("s3List3"), t("s3List4")]}
        />
      </LegalSection>

      <LegalSection title={t("s4Title")}>
        <p>{t("s4Body")}</p>
      </LegalSection>

      <LegalSection title={t("s5Title")}>
        <p>{t("s5Body1")}</p>
        <p>{t("s5Body2")}</p>
      </LegalSection>

      <LegalSection title={t("s6Title")}>
        <p>{t("s6Body")}</p>
      </LegalSection>

      <LegalSection title={t("s7Title")}>
        <p>{t("s7Body")}</p>
      </LegalSection>

      <LegalSection title={t("s8Title")}>
        <p>{t("s8Body")}</p>
      </LegalSection>
    </LegalArticle>
  );
}
