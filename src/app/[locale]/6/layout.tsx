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
 */
const tajawal = Tajawal({
  variable: "--font-display-arabic",
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
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
