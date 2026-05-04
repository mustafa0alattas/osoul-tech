import { Tajawal } from "next/font/google";

/**
 * Tajawal is loaded ONLY for /6 (the Saudi Royal Khuzama variant).
 * Co-locating the font import inside this segment's layout means
 * next/font/google emits the asset only for routes that mount this
 * subtree — verified via network tab on /, /1–/5 (no Tajawal).
 *
 * Exposed as --font-display-arabic; consumed by Tajawal-eligible
 * elements (hero, eyebrow, large stat numerals, final headline) via
 * inline fontFamily references inside this variant's components.
 *
 * Weights: Tajawal on Google Fonts ships 200/300/400/500/700/900.
 * 800 does not exist; requesting it silently drops the asset and the
 * heaviest weight available falls back, defeating the display look.
 * We use 900 (Black) as the ceremonial display weight.
 */
const tajawal = Tajawal({
  variable: "--font-display-arabic",
  subsets: ["arabic"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export default function KhuzamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-variant="khuzama" className={tajawal.variable}>
      {children}
    </div>
  );
}
