# Osoul.Tech — أصول تك

A pre-launch marketing and lead-capture site for **Osoul.Tech (أصول تك)**, a Saudi fractional real estate ownership platform operating within the regulatory sandbox of the General Authority for Real Estate (REGA).

The site is Arabic-first (RTL), with an English mirror, and exists for a single purpose: convert qualified visitors into segmented leads (investor / property owner / institutional partner) ahead of platform launch. There is no app, no login, and no transaction layer.

For brand voice, design system, and product context, read `PRODUCT.md` and `DESIGN.md` at the project root before changing any UI. `CLAUDE.md` summarizes the same context for AI agents.

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript, `src/` layout, Turbopack)
- **Styling**: Tailwind CSS v4 (CSS-based `@theme` config in `globals.css`) + shadcn/ui (Base UI variant)
- **i18n**: `next-intl` 4.x with `[locale]` segment (default `ar`, secondary `en`)
- **Forms**: `react-hook-form` + `zod` (discriminated union for the three registration types)
- **Motion**: `framer-motion` (held in dependencies for future use; current entrance animation is a CSS keyframe with `prefers-reduced-motion` support)
- **Icons**: `lucide-react`
- **Future backend** (deferred): `@supabase/supabase-js` for lead persistence, `resend` for transactional email

## Local development

### Prerequisites

- Node.js **20 or newer**
- npm (the lockfile is npm; switch to pnpm/yarn/bun only if you also regenerate the lockfile)

### Setup

```bash
npm install
cp .env.example .env.local      # then fill in NEXT_PUBLIC_SITE_URL for your dev/staging URL
npm run dev
```

Open `http://localhost:3000` — the proxy redirects `/` to `/ar`.

### Environment variables

See `.env.example`. The only variable required for local dev is `NEXT_PUBLIC_SITE_URL`; everything else is for the future backend integration.

### Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server with Turbopack |
| `npm run build` | Production build (TypeScript check included) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/
    [locale]/             — locale-segmented routes (ar / en)
      page.tsx            — home
      about/, how-it-works/, shariah/, faq/, contact/
      register-interest/, privacy/, terms/, risks/
      not-found.tsx       — localized 404
      error.tsx           — localized error boundary
      layout.tsx          — locale layout (fonts, JSON-LD, skip link, header/footer)
    not-found.tsx         — root fallback 404
    sitemap.ts            — dynamic sitemap with hreflang alternates
    robots.ts             — robots.txt
    opengraph-image.tsx   — 1200x630 OG image (next/og)
    icon.tsx              — 32x32 favicon
    apple-icon.tsx        — 180x180 Apple touch icon
    globals.css           — brand tokens + utilities (paper palette, gradient, motion)
  components/
    layout/               — Header, Footer, MobileNav, Logo, Container, FloatingWhatsApp
    sections/             — page sections (Hero, Stats, How, Why, Opportunities, Audience, FinalCta, FAQ list, shared/PageHero, shared/LegalArticle)
    forms/                — RegisterInterestForm
    ui/                   — shadcn primitives + local Form wrapper
    CookieBanner.tsx      — PDPL-compliant consent banner
  i18n/
    routing.ts, request.ts, navigation.ts
  lib/
    contact.ts            — single source of truth for WhatsApp / email
    seo.ts                — central buildMetadata() factory
    utils.ts              — cn(), shadcn helper
    validations/
      register-interest.ts — Zod discriminated-union schema with i18n errors
  proxy.ts                — Next 16 middleware (locale negotiation)
messages/
  ar.json, en.json        — parallel translation catalogs
PRODUCT.md, DESIGN.md, CLAUDE.md — brand and design context
```

## Brand and design

- `PRODUCT.md` — strategic context: users, voice, brand personality, anti-references, design principles, accessibility floor.
- `DESIGN.md` — visual system (Stitch DESIGN.md format): tokens, typography, elevation, components, named rules.
- `CLAUDE.md` — quick reference for AI agents.

When adding UI, the rules in DESIGN.md's *Do's and Don'ts* are non-negotiable. The most-violated rules to keep in mind:
- The brand gradient appears at most twice per page (typically the wordmark and the final CTA banner).
- Pivot teal covers ≤10% of any screen.
- No pure `#000` or `#fff`. Use the Paper / Parchment / Ink tokens.
- No em dashes in user-facing copy.
- Numerals always use tabular figures (`numerals-tabular`) and stay LTR (`numerals-ltr`) even in RTL flow.

## Internationalization

- The default locale is **`ar`** (RTL). English is secondary.
- Every translation key must exist in both `messages/ar.json` and `messages/en.json`. Don't ship asymmetric catalogs.
- The locale switcher (`src/components/layout/LocaleSwitcher.tsx`) preserves the current path.
- Numerals and dates render via `Intl` with `ar-SA` / `en-US` locales.
- New page metadata: add the page key to `Seo.<page>` in both message files, then call `buildMetadata({ locale, page })` in the route's `generateMetadata`.

### Adding a new translation key

1. Add the key under the appropriate namespace in `messages/ar.json`.
2. Add the **same key** with the same path in `messages/en.json`.
3. Use `useTranslations("Namespace")` server-side or in client components.

### RTL/LTR notes

- Use logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-*`, `end-*`) — never `ml-`, `mr-`, `pl-`, `pr-`, `left-*`, `right-*` — so flips are automatic.
- Icons that imply direction get `rtl-flip` (defined in `globals.css`).
- For numerals inside an RTL paragraph, wrap in `numerals-ltr` to keep digits in their natural reading order.

## Pre-launch checklist

Things the user needs to do before going live:

- [ ] **Logo SVG** — replace the gradient-text wordmark stand-in in `src/components/layout/Logo.tsx` with the final SVG. Same swap inside `src/components/layout/MobileNav.tsx` (SheetTitle).
- [ ] **WhatsApp number** — single source of truth: `src/lib/contact.ts`. Replace `WHATSAPP_NUMBER` and `WHATSAPP_DISPLAY` with the real values; `FloatingWhatsApp` and `/contact` automatically pick up the change.
- [ ] **Contact email** — `CONTACT_EMAIL` in `src/lib/contact.ts`. `info@osoul.tech` is the placeholder.
- [ ] **`NEXT_PUBLIC_SITE_URL`** — set in production env to the live domain (e.g. `https://osoul.tech`). Sitemap, robots.txt, JSON-LD, and OG metadata all read this.
- [ ] **Real `/api/register-interest` endpoint** — `RegisterInterestForm` currently calls a 1.2 s simulated submit. Wire it up against Supabase + Resend when the data flow is approved.
- [ ] **Custom domain DNS** — point the domain at Vercel.
- [ ] **Sharia committee profiles** — replace the typographic monograms (أ / ب / ج) on `/shariah` with real names, bios, and (eventually) photos.
- [ ] **Property opportunities** — current cards on the home page are typographic plates with mock data. Replace with real opportunities post-launch.
- [ ] **Analytics** — set `NEXT_PUBLIC_GA_ID` (or wire up your analytics provider of choice).
- [ ] **Submit sitemap to Google Search Console** at `https://osoul.tech/sitemap.xml` once the domain is live.

## Deployment to Vercel

1. Push the repository to GitHub (or your Git host of choice).
2. In the Vercel dashboard, **Add New → Project** and import the repo.
3. Framework preset: **Next.js** (auto-detected). Root directory: project root.
4. Set the **environment variables** from `.env.example` in *Project Settings → Environment Variables*. At minimum, `NEXT_PUBLIC_SITE_URL` for production.
5. Deploy. The first deploy provisions a `*.vercel.app` URL.
6. **Custom domain**: *Project Settings → Domains → Add* `osoul.tech` (and `www.osoul.tech` if applicable). Vercel walks you through the DNS records to add at your registrar.
7. Re-deploy after DNS resolves so the build picks up the final `NEXT_PUBLIC_SITE_URL`.

## License

Proprietary. © Osoul.Tech. All rights reserved.
