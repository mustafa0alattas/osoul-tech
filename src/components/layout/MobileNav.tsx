"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "./nav-items";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function MobileNav() {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const side = locale === "ar" ? "right" : "left";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-11 md:hidden"
            aria-label={t("Nav.openMenu")}
          />
        }
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side={side} className="flex w-72 flex-col gap-6 p-6">
        <SheetHeader className="p-0 text-start">
          <SheetTitle className="text-osoul-gradient text-xl font-bold">
            {t("Brand.name")}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-osoul-pivot"
            >
              {t(`Nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t pt-4">
          <Link
            href="/register-interest"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full bg-osoul-pivot font-semibold text-paper shadow-rest transition-colors hover:bg-osoul-pivot/90",
            )}
          >
            {t("CTA.registerInterest")}
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {t("Locale.switchTo")}
            </span>
            <LocaleSwitcher variant="outline" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
