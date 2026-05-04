import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { PageHero } from "@/components/sections/shared/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, page: "contact" });
}

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        headline={t("heroHeadline")}
        sub={t("heroSub")}
      />

      {/* Contact methods */}
      <section className="border-y border-hairline bg-parchment">
        <Container className="py-20 sm:py-24 lg:py-28">
          <header className="animate-rise max-w-2xl">
            <SectionEyebrow>{t("methodsEyebrow")}</SectionEyebrow>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="animate-rise group flex flex-col gap-4 rounded-[10px] border border-hairline bg-paper p-6 transition-colors hover:border-osoul-pivot/40 hover:shadow-lift sm:p-7"
            >
              <Mail
                className="size-5 text-osoul-pivot"
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-osoul-deep">
                {t("emailLabel")}
              </span>
              <span className="numerals-ltr text-[1.0625rem] font-medium text-ink" dir="ltr">
                {CONTACT_EMAIL}
              </span>
              <span className="text-xs leading-relaxed text-muted-ink">
                {t("emailNote")}
              </span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-rise group flex flex-col gap-4 rounded-[10px] border border-hairline bg-paper p-6 transition-colors hover:border-osoul-pivot/40 hover:shadow-lift sm:p-7"
              style={{ animationDelay: "60ms" }}
            >
              <MessageCircle
                className="size-5 text-osoul-pivot"
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-osoul-deep">
                {t("whatsappLabel")}
              </span>
              <span
                className="numerals-tabular numerals-ltr text-[1.0625rem] font-medium text-ink"
                dir="ltr"
              >
                {WHATSAPP_DISPLAY}
              </span>
              <span className="text-xs leading-relaxed text-muted-ink">
                {t("whatsappNote")}
              </span>
            </a>

            <div
              className="animate-rise flex flex-col gap-4 rounded-[10px] border border-hairline bg-paper p-6 sm:p-7"
              style={{ animationDelay: "120ms" }}
            >
              <MapPin
                className="size-5 text-osoul-pivot"
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-osoul-deep">
                {t("officeLabel")}
              </span>
              <span className="text-[1.0625rem] font-medium text-ink">
                {t("officeValue")}
              </span>
              <span className="text-xs leading-relaxed text-muted-ink">
                {t("officeNote")}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick question */}
      <section className="bg-paper">
        <Container className="grid grid-cols-1 gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <header className="animate-rise lg:col-span-5">
            <SectionEyebrow>{t("faqEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight text-ink">
              {t("faqHeadline")}
            </h2>
          </header>
          <div
            className="animate-rise flex flex-col items-start gap-6 lg:col-span-7"
            style={{ animationDelay: "60ms" }}
          >
            <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink/80">
              {t("faqBody")}
            </p>
            <Link
              href="/faq"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-hairline bg-paper px-5 text-ink hover:bg-parchment",
              )}
            >
              {t("faqCta")}
            </Link>
          </div>
        </Container>
      </section>

      {/* Register interest */}
      <section className="border-t border-hairline bg-parchment">
        <Container className="grid grid-cols-1 gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <header className="animate-rise lg:col-span-5">
            <SectionEyebrow>{t("registerEyebrow")}</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight text-ink">
              {t("registerHeadline")}
            </h2>
          </header>
          <div
            className="animate-rise flex flex-col items-start gap-6 lg:col-span-7"
            style={{ animationDelay: "60ms" }}
          >
            <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink/80">
              {t("registerBody")}
            </p>
            <Link
              href="/register-interest"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 bg-osoul-pivot px-5 text-paper hover:bg-osoul-pivot/90",
              )}
            >
              {t("registerCta")}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
