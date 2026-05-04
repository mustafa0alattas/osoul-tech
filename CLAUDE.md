# Osoul.Tech — أصول تك

A pre-launch website for **Osoul.Tech / أصول تك**, a fractional real estate ownership platform in Saudi Arabia. This is a marketing / lead-capture site only — there is **no app to download, no login, no portfolio dashboard yet**. Every primary CTA is "Register Interest" / "سجّل اهتمامك".

---

## Brand

| | |
|---|---|
| Name (EN) | Osoul.Tech |
| Name (AR) | أصول تك |
| Sector | Fractional real estate ownership |
| Market | Kingdom of Saudi Arabia |
| Stage | **Pre-launch** — REGA sandbox track |

### Personality
- **Trusted** — regulated, Sharia-conscious, transparent.
- **Genuinely Saudi** — built locally for the local market; AR is the default voice.
- **Modern & Digital** — clean, fast, mobile-first.
- **Refined & Accessible** — premium feel without being intimidating; the smallest investor matters.

### Voice
- Arabic is **default**. English is secondary.
- Speak plainly. No jargon-heavy finance prose.
- Mention REGA sandbox status where credibility helps; do not overclaim regulation.

---

## Visual identity

### Brand colors
| Token | Hex | Role |
|---|---|---|
| `osoul-deep` | `#0F63A5` | Deep Blue — anchors, headings, depth |
| `osoul-pivot` | `#2391A0` | **Pivot — primary brand color** |
| `osoul-turquoise` | `#31AE9C` | Turquoise — accent, highlights, success |

Tailwind v4 tokens are declared in `src/app/globals.css` under `@theme`. Use them as `bg-osoul-pivot`, `text-osoul-deep`, `border-osoul-turquoise`, etc. Pivot (`#2391A0`) is the **default brand color** — when a design says "use the brand color" without qualifying, this is it.

### Brand gradient
```css
background: linear-gradient(90deg, #31AE9C 0%, #2391A0 50%, #0F63A5 100%);
```
Available as the utility `bg-osoul-gradient`. Use for hero accents, the wordmark stand-in, and key CTAs sparingly.

### Typography
Loaded via `next/font/google`:
- **IBM Plex Sans Arabic** — Arabic text (default locale).
- **IBM Plex Sans** — Latin text.

Weights: **300 / 400 / 500 / 700**.

The active font follows the locale via the `<html lang dir>` attributes set in `src/app/[locale]/layout.tsx`.

### Logo
Final SVG logo is not yet delivered. Until it arrives, the wordmark is rendered as text "أصول تك" / "Osoul.Tech" with `bg-osoul-gradient` clipped to text. Swap to the SVG when received — the placeholder lives in `src/components/layout/Logo.tsx`.

---

## Localization

- Languages: **AR** (default, RTL) + **EN** (secondary, LTR).
- Routing: `next-intl` with `[locale]` segment. Default `/` → `/ar`.
- `<html dir>` is set per request based on the active locale.
- Message catalogs live in `messages/ar.json` and `messages/en.json`. Keep keys parallel between the two; **never** ship an Arabic key without its English counterpart (or vice versa).
- Numeric and date formatting should use the locale (`Intl.NumberFormat` with `ar-SA` / `en-US`).

---

## Pre-launch rules (do not violate)

1. **No "download the app"** copy or links anywhere.
2. **No "login" or "sign in"** affordance. There is no account yet.
3. The single conversion goal is **Register Interest** (`سجّل اهتمامك`). Every page should have a clear path to it.
4. Do not advertise specific deals, returns, or properties. Speak about the platform, the model, and Sharia/REGA framing.
5. Sharia compliance and REGA sandbox status are credibility pillars — surface them on the home page, the FAQ, and the footer.

---

## Stack

- Next.js (App Router, TypeScript, `src/` layout)
- Tailwind v4 (CSS-based `@theme` config in `globals.css`) + shadcn/ui
- `next-intl` for AR/EN
- `react-hook-form` + `zod` for the interest form
- `framer-motion` for tasteful motion
- `@supabase/supabase-js` for lead persistence (planned)
- `resend` for transactional email (planned)

## Layout

Layout primitives live in `src/components/layout/`:
- `Header` — sticky, logo, nav, locale switcher, prominent "سجّل اهتمامك" CTA.
- `Footer` — about / nav / legal / contact + REGA sandbox mention + copyright.
- `MobileNav` — slide-out sheet (shadcn `Sheet`).
- `FloatingWhatsApp` — fixed bottom-corner WhatsApp shortcut.
- `Container` / `Section` — consistent width and vertical rhythm.

## Nav (canonical order)
الرئيسية · عن أصول تك · طريقة العمل · الالتزام الشرعي · الأسئلة الشائعة · تواصل معنا
