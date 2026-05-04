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
  return buildMetadata({ locale, page: "privacy" });
}

export default function PrivacyPage() {
  const t = useTranslations("Privacy");
  return (
    <LegalArticle namespace="Privacy">
      <LegalSection title={t("s1Title")}>
        <p>{t("s1Body")}</p>
      </LegalSection>

      <LegalSection title={t("s2Title")}>
        <p>{t("s2Body1")}</p>
        <LegalList items={[t("s2List1"), t("s2List2"), t("s2List3")]} />
      </LegalSection>

      <LegalSection title={t("s3Title")}>
        <LegalList
          items={[t("s3List1"), t("s3List2"), t("s3List3"), t("s3List4")]}
        />
      </LegalSection>

      <LegalSection title={t("s4Title")}>
        <p>{t("s4Body1")}</p>
        <LegalList items={[t("s4List1"), t("s4List2")]} />
        <p>{t("s4Body2")}</p>
      </LegalSection>

      <LegalSection title={t("s5Title")}>
        <p>{t("s5Body")}</p>
      </LegalSection>

      <LegalSection title={t("s6Title")}>
        <p>{t("s6Body")}</p>
        <LegalList
          items={[t("s6List1"), t("s6List2"), t("s6List3"), t("s6List4")]}
        />
        <p>{t("s6Foot")}</p>
      </LegalSection>

      <LegalSection title={t("s7Title")}>
        <p>{t("s7Body")}</p>
      </LegalSection>

      <LegalSection title={t("s8Title")}>
        <p>{t("s8Body")}</p>
      </LegalSection>

      <LegalSection title={t("s9Title")}>
        <p>{t("s9Body")}</p>
      </LegalSection>
    </LegalArticle>
  );
}
