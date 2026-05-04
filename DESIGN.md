---
name: Osoul.Tech
description: A pre-launch landing site for a Saudi fractional real estate platform under REGA's regulatory sandbox.
colors:
  osoul-deep: "#0F63A5"
  osoul-pivot: "#2391A0"
  osoul-turquoise: "#31AE9C"
  ink: "#1A2024"
  paper: "#FBFAF7"
  parchment: "#F3F0EA"
  hairline: "#E4E0D8"
  muted-ink: "#5A6168"
typography:
  display:
    fontFamily: "IBM Plex Sans Arabic, IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "IBM Plex Sans Arabic, IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  title:
    fontFamily: "IBM Plex Sans Arabic, IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
  body:
    fontFamily: "IBM Plex Sans Arabic, IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Arabic, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
  numeric:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Arabic, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1, 'lnum' 1"
rounded:
  none: "0px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  pill: "999px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.osoul-pivot}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    typography: "{typography.title}"
  button-primary-gradient:
    backgroundColor: "{colors.osoul-pivot}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "14px 24px"
    typography: "{typography.title}"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    typography: "{typography.title}"
  card-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  stat-tile:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
    typography: "{typography.numeric}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
    typography: "{typography.body}"
  badge-soft:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.osoul-pivot}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
    typography: "{typography.label}"
---

# Design System: Osoul.Tech

## 1. Overview

**Creative North Star: "The Quiet Saudi Ledger"**

Osoul.Tech reads like a sovereign annual report rendered for a phone. The page is paper-toned, type-led, and composed in long verticals where numbers carry the weight of paragraphs. Authority is communicated through restraint, not flash: tabular figures aligned cleanly, generous margins, headings that breathe, a single brand teal that appears only when the institution actually speaks. The system is genuinely Saudi without props — no falcons, no palms, no marble — because cultural rootedness shows up in the language and the calm pacing, not in the decoration.

The system is built for an Arabic reader first. Line lengths, heading weights, vertical rhythm, and gutter sizes were tuned against IBM Plex Sans Arabic; the English LTR mirror is a faithful translation of the same composition, never a separate design. RTL is not an afterthought — every directional element (icons that imply forward, slide-in panels, edge alignment) flips with the locale. Numerals always run left-to-right with proportional and tabular features locked on, so they read identically in both directions.

This system explicitly rejects: SaaS-cream Stripe/Linear clones, crypto neon and dark-mode mysticism, Dubai-real-estate flash (gold, marble, supercars), purple/violet gradients of any kind, glassmorphism, neumorphism, hero-metric "big number + tiny label + gradient accent" templates, and any photography it didn't shoot itself. If a page can be guessed as "fintech landing 2024" from a thumbnail, it has failed.

**Key Characteristics:**
- Paper-toned warm neutrals, not screen-grey.
- Brand color used as a **voice**, not a coat — Pivot teal appears on ≤10% of any given screen.
- Type-led hierarchy. Numerals do the heavy lifting in trust sections.
- Flat by default. Depth comes from contrast and spacing, not from shadows.
- Generous whitespace. Sections breathe with at least 96px of vertical room on desktop.

## 2. Colors

A warm paper palette in the body, anchored by a single Saudi-coastal teal that owns the brand's voice. The blue-to-turquoise gradient exists, but it is rare and ceremonial, never a wallpaper.

### Primary
- **Pivot Teal** (`#2391A0`): the institution speaking. Used on the primary CTA, focus rings, link hovers, the active state of nav items, and in the gradient stop that does the work. Not a fill color for backgrounds.
- **Deep Anchor Blue** (`#0F63A5`): typographic emphasis on headlines that need extra gravity, the deep stop of the brand gradient, and quiet accents on stat numerals where blue-over-paper looks more institutional than teal.
- **Coast Turquoise** (`#31AE9C`): the bright stop of the brand gradient, plus reserved success/positive states (a returns-distributed indicator, a confirmation chip). Never a button.

### Neutral
- **Ink** (`#1A2024`): body text, headings on light surfaces. Tinted ever so slightly toward the brand hue so it never reads as hard #000.
- **Paper** (`#FBFAF7`): the page background. Warm, slightly off-white. Reads as paper, not as a "white card on white background" SaaS surface.
- **Parchment** (`#F3F0EA`): the second-tier surface — stat tiles, footnotes, quiet sections, alternating bands.
- **Hairline** (`#E4E0D8`): the only border color. 1px rules and dividers, full borders on cards. Never used as a stripe.
- **Muted Ink** (`#5A6168`): captions, footnote labels, the muted side of label/value pairs.

### Named Rules
**The One Voice Rule.** Pivot teal is used on no more than ~10% of any given screen. Its rarity is what makes it sound like an institution speaking instead of a startup shouting. If a layout needs more teal to feel "branded", the layout is wrong, not the rule.

**The Gradient is a Punctuation Rule.** The brand gradient (`linear-gradient(90deg, #31AE9C, #2391A0, #0F63A5)`) appears at most twice per page: typically once in the wordmark/logo, once on the final-CTA banner. Never on body text. Never on every heading. Never as a section background.

**The No-Black Rule.** Pure `#000` and pure `#fff` are forbidden. Neutrals are tinted toward the brand hue (chroma 0.005–0.01). Tinted ink reads warm and institutional; pure black reads cheap.

## 3. Typography

**Display Font:** IBM Plex Sans Arabic (IBM Plex Sans for Latin fallback, ui-sans-serif system fallback)
**Body Font:** Same family. The system uses one type voice across both scripts.
**Numeric Font:** IBM Plex Sans with `font-feature-settings: 'tnum' 1, 'lnum' 1` for tabular lining figures. Numerals are always LTR even in RTL contexts.

**Character.** IBM Plex carries the right tension: open, clear, slightly humanist (so it doesn't read as cold corporate sans), but still tabular and engineered enough to feel like a financial institution. Plex Sans Arabic was designed with Plex Sans as a sibling, so the bilingual setting reads as one composition rather than a forced pairing.

### Hierarchy
- **Display** (700 weight, `clamp(2.25rem, 5vw, 4rem)`, line-height 1.1, tracking -0.01em): hero headlines only. Maximum two on the home page.
- **Headline** (600 weight, `clamp(1.5rem, 3vw, 2.25rem)`, line-height 1.2): section openers (How It Works, Why Us, etc.). Always preceded by a label.
- **Title** (500 weight, 1.125rem, line-height 1.4): card titles, list-item headings, sub-sections.
- **Body** (400 weight, 1rem, line-height 1.65): the workhorse. Cap measure at 65–75ch on desktop; on Arabic, default to ≤70ch — Arabic glyphs run wider in lowercase.
- **Label** (500 weight, 0.75rem, tracking 0.04em, often lowercase or capitalized — never ALL CAPS in Arabic): eyebrows above headlines, form field labels, footnote tags.
- **Numeric / Stat** (500 weight, `clamp(2rem, 4vw, 3rem)`, line-height 1, tabular figures): the four trust-indicator tiles, the *"3 خطوات"* / *"5 steps"* counters, every percentage. Always paired with a tiny muted label sitting beneath, never above.

### Named Rules
**The Tabular Numerals Rule.** Every numeric value — percentages, durations, "100%", step counters, currency — uses `font-feature-settings: 'tnum' 1, 'lnum' 1`. Numerals must align in vertical lists and never re-flow when their values change.

**The No All-Caps in Arabic Rule.** Arabic has no concept of letter-case. Eyebrow labels in Arabic stay sentence-cased. Their English counterparts may use Title Case but never SHOUTING CAPS. Tracking compensates for the loss of visual weight.

**The Single-Voice Rule.** One type family across the entire system. Pairing IBM Plex with a serif "for elegance" or with a display face "for personality" is forbidden. Variation comes from weight and scale, not from a second family.

## 4. Elevation

The system is **flat by default**. Depth is communicated through spatial rhythm, surface tint (Paper vs. Parchment), and 1px Hairline rules — not through shadows. A page should look as if it were printed on warm stock.

Shadows appear only as a response to interaction state, never as decoration at rest. There are exactly two ambient shadows in the system, used sparingly.

### Shadow Vocabulary
- **`shadow-rest`** (`box-shadow: 0 1px 0 0 rgba(26,32,36,0.04), 0 1px 2px 0 rgba(26,32,36,0.04)`): the absolute minimum — 1px hairline + a barely-visible underglow. Used on the floating WhatsApp button at rest and on the sticky header once the page has scrolled past hero.
- **`shadow-lift`** (`box-shadow: 0 8px 24px -8px rgba(15,99,165,0.12), 0 2px 6px -2px rgba(26,32,36,0.06)`): hover-state lift on interactive cards (audience selector, opportunity mockups). Tinted toward Deep Anchor Blue so the lift reads as branded depth, not as drop shadow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. A card that needs a shadow to be readable has a contrast or spacing problem instead. Fix the contrast or the rhythm; do not add a shadow.

**The No-Glass Rule.** No `backdrop-filter: blur()` as decoration. The header's `supports-[backdrop-filter]:bg-background/60` translucency is the only sanctioned use, and only because it is sticky over scrolling content. Glass cards, frosted overlays, and "iOS-style modal blurs" are forbidden.

## 5. Components

### Buttons
- **Shape:** Gently curved (`{rounded.lg}` = 10px). Not pill-shaped, not sharp-cornered. Pill shapes read as fintech-toy; sharp corners read as brutalist.
- **Primary (Pivot):** solid `#2391A0` background, Paper text, 12–14px vertical padding, 20–24px horizontal. Hover: `opacity: 0.9`. Active: 1px translate down. The default for almost every CTA on the site.
- **Primary (Gradient):** the brand gradient as background, Paper text, used **only** on the hero primary CTA and the final-CTA banner. See *The Gradient is a Punctuation Rule*.
- **Ghost / Secondary:** Paper background, Ink text, 1px Hairline border. Hover: Parchment background. Used for "تعرّف علينا" and other low-stakes secondary paths.
- **Focus:** 3px ring at `{colors.osoul-pivot}` / 50% alpha, with a 2px offset from the button edge. Visible in both light and dark.

### Stat Tile (signature component)
The trust-indicator tiles in the stats strip. A square or near-square Parchment surface, no border, with the numeric on top and a short Arabic label beneath in Muted Ink. Numerals are extra-large, use tabular figures, and sit flush-start (right in RTL, left in LTR). The label sits at the same flush edge so the eye reads label-then-number with one vertical sweep. No icons. No decorations.

### Cards
- **Corner Style:** 10px (`{rounded.lg}`).
- **Background:** Paper for primary, Parchment for secondary.
- **Border:** always a full 1px Hairline border. **Never** a side-stripe accent — `border-left` / `border-right` greater than 1px as a colored accent is banned (see Do's and Don'ts).
- **Shadow:** none at rest. `shadow-lift` only when the card is interactive and hovered.
- **Internal Padding:** 24px (`{spacing.lg}`) on desktop, 20px on mobile.

### Inputs
- **Style:** Paper background, 1px Hairline border, 8px radius, 12×14px padding.
- **Label:** sits above the input as a Label-class type element (Muted Ink, sentence case).
- **Focus:** Hairline → Pivot teal, plus a 3px Pivot/20% glow ring.
- **Error:** the message replaces the helper text, in a desaturated red-orange (never pure red); the input border turns a 1.5px desaturated red-orange. Color is never the only signal — the message and an inline icon both communicate the error.

### Navigation
- **Header:** sticky, 64px tall, Paper at 80% with backdrop blur. Logo on the leading edge, nav links centered or trailing, language switch + primary CTA on the trailing edge.
- **Nav links:** Title-class type, 14px, 500 weight. Default Ink/75. Hover: Pivot teal + Parchment background tint (the only "hover background" affordance allowed in the system).
- **Active state:** Pivot teal text, no underline. (No underlines anywhere — see Do's and Don'ts.)
- **Mobile:** the same header collapses to a hamburger that opens a Sheet from the leading edge of the locale (right in AR-RTL, left in EN-LTR). The Sheet is a full Paper surface, never glass.

### Final-CTA Banner (signature component)
A full-width, ~480px tall band at the bottom of the home page, filled with the brand gradient. White headline (Display), one-paragraph supporting copy (Body, white at 90%), and a single Paper-on-gradient button ("سجّل اهتمامك"). No second button. No decorative pattern. The gradient is the entire visual statement.

## 6. Do's and Don'ts

### Do:
- **Do** lead trust sections with numerals. A "100%" rendered in tabular figures says more than a sentence.
- **Do** keep Pivot teal on ≤10% of any screen. Brand color is a voice, not a coat.
- **Do** reserve the brand gradient for at most two slots per page (typically wordmark + final CTA banner).
- **Do** use Paper (`#FBFAF7`) and Parchment (`#F3F0EA`) for surfaces. The two-tone paper palette is the system's signature.
- **Do** flip every directional element when locale switches. RTL is not a CSS hack; it's a layout decision.
- **Do** lock numeric figures to `font-feature-settings: 'tnum' 1, 'lnum' 1`. Always.
- **Do** rest on whitespace. Sections breathe with at least 96px (`{spacing.section}`) of vertical room on desktop.

### Don't:
- **Don't** use side-stripe borders. `border-left` / `border-right` greater than 1px as a colored accent on cards, list items, or callouts is banned outright. Use a full border, a tint, or a leading numeral instead.
- **Don't** use gradient text. `background-clip: text` over a gradient is decorative-only and forbidden in body, headings, and emphasis. The wordmark stand-in uses it precisely because it is a wordmark, not a heading; once the SVG logo arrives, even that goes away.
- **Don't** use glassmorphism, neumorphism, or any frosted-pane decoration. The header's translucency is the only exception.
- **Don't** use purple/violet gradients of any kind. The brand gradient runs teal → teal → blue, never anywhere near violet.
- **Don't** use crypto/Web3 visual grammar — neon, "matrix", 3D coins, holographic foils, dark-mode mysticism. Reject on sight.
- **Don't** use Dubai-real-estate flash — gold accents, marble veins, Bugatti / luxury-watch vibes, supercar stock photography. Saudi gravitas is calm, not flashy.
- **Don't** clone Stripe / Linear / Vercel / Notion / Resend layouts. If the home page could be mistaken for any of those at thumbnail size, redo it.
- **Don't** ship the hero-metric template (big number + tiny label + gradient accent + three supporting stats). The Stat Tile in this system is intentionally typographic, not templated.
- **Don't** ship identical card grids — six same-sized cards with icon + heading + paragraph, repeated. Vary card sizes, vary their content density, break the grid.
- **Don't** rely on color alone for status. Pair every color signal with weight, icon, or text label. Color-blind users must still parse the meaning.
- **Don't** use em dashes anywhere — em or `--` — in either Arabic or English copy. Use commas, colons, semicolons, periods, or parentheses. Arabic copy doubly so: em dashes are an English typographic import.
- **Don't** translate-from-English in Arabic. Calques and English word order in Arabic sentences are immediate trust killers for the primary audience. Write Arabic natively, then verify the English mirror reads.
- **Don't** ship pure `#000` or `#fff`. Tint every neutral toward the brand hue.
- **Don't** add app-store badges, login buttons, or any affordance that implies an account exists. The single conversion is "سجّل اهتمامك".
