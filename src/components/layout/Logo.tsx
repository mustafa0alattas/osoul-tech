import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

// Text-based stand-in until the final SVG logo arrives. Replace the inner
// <span> with the SVG component when delivered (see CLAUDE.md).
export function Logo({ className }: LogoProps) {
  const t = useTranslations("Brand");
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={t("name")}
    >
      <span className="text-osoul-gradient text-xl font-bold tracking-tight sm:text-2xl">
        {t("name")}
      </span>
    </Link>
  );
}
