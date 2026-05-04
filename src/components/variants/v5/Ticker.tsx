"use client";

import { useEffect, useState } from "react";

type Item = { label: string; value: string };

export function Ticker({ items, intervalMs = 3500 }: { items: Item[]; intervalMs?: number }) {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs, reduce]);

  // For reduced-motion, render all items inline.
  if (reduce) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="list">
        {items.map((it, k) => (
          <div key={k} role="listitem" className="flex flex-col gap-1">
            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-ink">
              {it.label}
            </span>
            <span className="numerals-tabular numerals-ltr text-lg font-semibold text-osoul-deep">
              {it.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const current = items[i];
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-16 items-center gap-6 overflow-hidden rounded-[10px] border border-hairline bg-paper px-5"
    >
      <span className="size-2 shrink-0 rounded-full bg-osoul-turquoise" aria-hidden="true" />
      <div className="relative flex-1 overflow-hidden">
        <div
          key={i}
          className="flex animate-rise items-baseline gap-3"
        >
          <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-ink">
            {current.label}
          </span>
          <span className="numerals-tabular numerals-ltr text-base font-semibold text-osoul-deep">
            {current.value}
          </span>
        </div>
      </div>
      <span className="text-[0.65rem] tabular-nums text-muted-ink/80" aria-hidden="true">
        {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </span>
    </div>
  );
}
