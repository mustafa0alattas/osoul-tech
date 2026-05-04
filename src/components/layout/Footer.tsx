import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShieldCheck } from "lucide-react";
import { Container } from "./Container";
import { NAV_ITEMS } from "./nav-items";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-hairline bg-parchment">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-osoul-deep">
              {t("Brand.name")}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("Footer.aboutBody")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("Footer.navigationTitle")}</h4>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-osoul-pivot"
                  >
                    {t(`Nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("Footer.legalTitle")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground transition-colors hover:text-osoul-pivot"
                >
                  {t("Footer.legalPrivacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground transition-colors hover:text-osoul-pivot"
                >
                  {t("Footer.legalTerms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/risks"
                  className="text-muted-foreground transition-colors hover:text-osoul-pivot"
                >
                  {t("Footer.legalRisks")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("Footer.contactTitle")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hello@osoul.tech"
                  className="transition-colors hover:text-osoul-pivot"
                >
                  hello@osoul.tech
                </a>
              </li>
              <li>
                <Link
                  href="/register-interest"
                  className="transition-colors hover:text-osoul-pivot"
                >
                  {t("CTA.registerInterest")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck
              className="size-4 text-osoul-pivot"
              aria-hidden="true"
            />
            <span>{t("Footer.regaSandbox")}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("Footer.copyright", { year })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
