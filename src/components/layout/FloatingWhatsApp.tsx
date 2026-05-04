import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export function FloatingWhatsApp() {
  const t = useTranslations("Whatsapp");
  const href = WHATSAPP_URL;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      className="fixed bottom-5 end-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-osoul-pivot focus-visible:ring-offset-2"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
      <span className="sr-only">{t("label")}</span>
    </a>
  );
}
