import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { NAV_ITEMS } from "./nav-items";

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline/80 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-osoul-pivot"
              >
                {t(`Nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LocaleSwitcher />
          <Link
            href="/register-interest"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-10 bg-osoul-pivot px-4 font-semibold text-paper shadow-rest transition-colors hover:bg-osoul-pivot/90 sm:inline-flex",
            )}
          >
            {t("CTA.registerInterest")}
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
