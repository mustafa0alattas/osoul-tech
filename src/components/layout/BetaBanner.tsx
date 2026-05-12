import { useTranslations } from "next-intl";

export function BetaBanner() {
  const t = useTranslations("BetaBanner");
  return (
    <div
      role="banner"
      className="w-full text-center"
      style={{
        backgroundColor: "var(--khuzama-deep)",
        color: "var(--khuzama-mist)",
        padding: "8px 16px",
        fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
        fontWeight: 500,
        letterSpacing: "0.12em",
        lineHeight: 1.4,
      }}
    >
      {t("message")}
    </div>
  );
}
