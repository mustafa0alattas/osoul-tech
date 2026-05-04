# Product

## Register

brand

## Users

**Primary — Saudi retail investors.** Ages 28–55. Professionals and business owners with 10K–500K SAR available for diversified investment. They care about Sharia compliance, official sukuk-style ownership registration, and operator trust before they care about UI polish. They are skeptical of crypto/fintech hype but open to modern digital tools when the institution behind them is credible. Arabic is their reading and decision language; English is a fallback.

**Secondary — property owners.** Ages 40–65. Want liquidity without divesting an entire asset. Read carefully, do not click impulsively, will pick up the phone before signing.

**Tertiary — institutional partners.** Banks, real estate developers, financial advisors evaluating Osoul as a distribution or co-investment partner. They are scanning for legitimacy signals (regulator framing, governance, Sharia board, partnerships) far more than aesthetic flourishes.

The site meets all three audiences in one Arabic-default surface, with paths into the lead-capture form segmented by visitor type.

## Product Purpose

A pre-launch landing site for **Osoul.Tech (أصول تك)**, a Saudi fractional real estate ownership platform operating under the regulatory sandbox of the General Authority for Real Estate (REGA). The site does not transact, does not host an account system, does not offer an app. Its single job is to convert qualified Arabic-speaking visitors into registered leads ahead of platform launch, while establishing institutional credibility on first impression.

Success is measured by:

1. Quality of registered leads (segmented by investor / owner / partner intent).
2. Time-on-page and depth on the *how it works* and *Sharia compliance* sections — these are the trust gates.
3. Bounce rate from non-Saudi or unintended traffic — the design should self-select Saudi context.

## Brand Personality

Four pillars, in tension on purpose.

- **موثوق · Trusted.** Calm authority. Reads like an institution, not a startup. No exclamation marks, no "revolutionary", no countdown timers.
- **سعودي أصيل · Genuinely Saudi.** Not Gulf-generic, not Dubai-flashy, not translated-from-English. Arabic is the native voice, not a localization. Visual references rooted in the Kingdom (light, geometry, restraint), not stock-photo Riyadh skylines.
- **عصري ورقمي · Modern & Digital.** Fast, mobile-first, type-led. Looks like 2026, not 2018. Confident with whitespace.
- **راقٍ متاح · Refined & Accessible.** Premium without intimidation. The smallest investor matters. Plain Arabic over jargon. Numeric clarity over copywriter swagger.

**Voice.** Speaks Arabic naturally — short, declarative, direct. One register that reads correctly to a first-time investor and to a portfolio manager. Never breathless. Never folksy. English is a faithful echo, not a re-pitch.

## Anti-references

Hard-banned visual and copy patterns. If a draft drifts into any of these, throw it out.

**Visual languages to avoid:**
- Purple/violet gradients of any kind.
- Glassmorphism. Neumorphism. Any frosted-pane decoration.
- Crypto / Web3 visual grammar — neon, "matrix", 3D coins, holographic foils, dark-mode mysticism.
- Generic Western SaaS clones. Specifically, any layout that could be mistaken for Stripe, Linear, Vercel, Notion, or Resend.
- Gold accents, marble veins, Bugatti / luxury-watch / Dubai-real-estate flashiness.
- Generic geometric "modern app template" backgrounds (gradients with floating blurred orbs).
- Notion-style playful illustrations of round-headed people.

**Photography to avoid:**
- Stock photos of handshakes.
- Suited men in glass towers.
- "Diverse team smiling at a laptop."
- Any image where the subject is clearly not in the Kingdom.

**Copy to avoid:**
- "Revolutionary", "Unlock", "Disrupt", "Game-changing".
- Em dashes used as decoration.
- Translated-from-English Arabic (literal calques, English word order in Arabic sentences).
- Promises about returns, specific deals, or guaranteed outcomes.

**Aesthetic direction (the lane we want):** editorial-meets-financial-institution. Confident typography. Calm palette. Generous whitespace. Saudi-rooted but globally legible. Closer to a serious publication or a sovereign fund's annual report than to a fintech app.

## Design Principles

1. **Trust before delight.** Every section should leave the visitor more confident in the institution. Decorative motion, illustrations, or icon flourishes that do not earn trust are cut.
2. **Arabic is native, not localized.** AR is the default; layouts, line lengths, weights, and rhythm are designed for AR first and verified to still read in EN — never the inverse.
3. **Numbers carry the page.** A clear stat in IBM Plex's tabular figures says more than a paragraph. Lean on numerals, ratios, percentages, and concise factual labels rather than long marketing prose.
4. **Saudi without props.** Cultural rootedness shows in language, calm, and measured pacing — not in palm trees, falcons, or sand textures. The site reads as Saudi because it sounds Saudi, not because it depicts Saudi.
5. **One conversion goal.** Every section terminates, directly or by adjacency, in *سجّل اهتمامك*. Nothing competes with it. No app stores, no logins, no secondary funnels.

## Accessibility & Inclusion

- **WCAG 2.2 AA** as the floor for color contrast, focus visibility, and keyboard reachability.
- **RTL-correct layouts.** Every directional decision (icons that imply direction, edge alignment, slide-in panels) flips with the locale, not just the text.
- **Numeric & date formatting** uses `Intl` with `ar-SA` and `en-US` respectively. Phone numbers display in their native order in each locale.
- **Reduced motion.** All non-essential animation respects `prefers-reduced-motion: reduce`.
- **Tap targets** ≥ 44×44px on mobile. Form fields use Arabic-aware autocomplete attributes.
- **Color-blind safe.** Status and emphasis never rely on color alone — combine with weight, icon, or label.
- **Language switching** is one tap, preserves the current path, and is reachable from both header and mobile nav.
