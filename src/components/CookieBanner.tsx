"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "osoul-cookies-accepted";

export function CookieBanner() {
  const t = useTranslations("Cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY);
      if (!accepted) setVisible(true);
    } catch {
      // localStorage unavailable (e.g., privacy mode) — keep hidden.
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookies notice"
      className="animate-rise fixed inset-x-3 bottom-3 z-50 flex flex-col gap-3 rounded-[10px] border border-hairline bg-paper p-4 shadow-rest sm:bottom-4 sm:end-4 sm:start-auto sm:max-w-md sm:p-5"
    >
      <button
        type="button"
        onClick={accept}
        aria-label={t("dismiss")}
        className="absolute top-2 inline-flex size-8 items-center justify-center rounded-md text-muted-ink transition-colors hover:bg-parchment hover:text-ink end-2"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
      <p className="pe-8 text-sm leading-relaxed text-ink/80">{t("body")}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={accept}
          className={cn(
            buttonVariants({ size: "sm" }),
            "h-9 bg-osoul-pivot px-4 text-paper hover:bg-osoul-pivot/90",
          )}
        >
          {t("accept")}
        </button>
        <Link
          href="/privacy"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "h-9 border-hairline bg-paper px-4 text-ink hover:bg-parchment",
          )}
        >
          {t("learnMore")}
        </Link>
      </div>
    </div>
  );
}
