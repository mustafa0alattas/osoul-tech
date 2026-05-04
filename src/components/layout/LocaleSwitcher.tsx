"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

type Props = {
  variant?: "ghost" | "outline";
};

export function LocaleSwitcher({ variant = "ghost" }: Props) {
  const locale = useLocale();
  const t = useTranslations("Locale");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const next = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          router.replace(pathname, { locale: next });
        })
      }
      className="h-10 gap-1.5 px-3 sm:h-9"
      aria-label={t("switchTo")}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span className="font-medium">{t("switchToShort")}</span>
    </Button>
  );
}
