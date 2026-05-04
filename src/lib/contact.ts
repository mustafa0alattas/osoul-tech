// Single source of truth for outbound contact details. Replace these placeholders
// with the real values once they are confirmed by the business.

/** Saudi mobile number in E.164 form, no leading "+" — used to build wa.me URLs. */
export const WHATSAPP_NUMBER = "966500000000";

/** WhatsApp deep-link to the business number. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Display form for the WhatsApp number. */
export const WHATSAPP_DISPLAY = "+966 50 000 0000";

/** Public-facing email. */
export const CONTACT_EMAIL = "info@osoul.tech";
