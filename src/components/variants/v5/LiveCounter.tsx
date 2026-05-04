"use client";

import { useEffect, useState } from "react";

/**
 * Mock "registrations to date" counter. Ticks up by 1 every 4–7 seconds.
 * Reduced-motion: holds at the seed value.
 */
export function LiveCounter({ seed = 1240 }: { seed?: number }) {
  const [n, setN] = useState(seed);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      setN((v) => v + 1);
      t = setTimeout(tick, 4000 + Math.random() * 3000);
    };
    t = setTimeout(tick, 4000 + Math.random() * 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <span className="numerals-tabular numerals-ltr inline-flex items-baseline gap-1 font-bold text-paper">
      <span className="size-2 self-center rounded-full bg-osoul-turquoise" aria-hidden="true" />
      <span>{n.toLocaleString("en-US")}</span>
    </span>
  );
}
