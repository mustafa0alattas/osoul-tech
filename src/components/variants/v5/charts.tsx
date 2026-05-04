"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Variant /5 chart primitives. All inline SVG, single-color, with
 * <title>/<desc> for screen readers (data is readable as text).
 * Animations respect prefers-reduced-motion.
 */

const PIVOT = "#2391A0";
const DEEP = "#0F63A5";
const TURQ = "#31AE9C";
const HAIRLINE = "#E4E0D8";

function useReduce() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const onChange = () => setR(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return r;
}

function useInView<T extends Element>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/** Sparkline that draws itself on scroll-into-view (or instantly under reduce). */
export function Sparkline({
  data,
  width = 320,
  height = 80,
  stroke = PIVOT,
  fill = true,
  ariaLabel,
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: boolean;
  ariaLabel: string;
}) {
  const reduce = useReduce();
  const { ref, seen } = useInView<SVGSVGElement>(0.4);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  const padY = 6;
  const pts = data.map((v, i) => {
    const x = i * stepX;
    const y = padY + (1 - (v - min) / range) * (height - padY * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = `M ${pts.join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
  const animate = !reduce && seen;
  const totalLen = width + height;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="none"
      className="block"
    >
      <title>{ariaLabel}</title>
      {fill && (
        <path
          d={areaPath}
          fill={stroke}
          fillOpacity={animate ? 0.10 : 0}
          style={{
            transition: "fill-opacity 1200ms ease 600ms",
          }}
        />
      )}
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLen}
        strokeDashoffset={animate ? 0 : totalLen}
        style={{
          transition: reduce
            ? "none"
            : "stroke-dashoffset 1600ms cubic-bezier(0.165, 0.84, 0.44, 1)",
        }}
      />
    </svg>
  );
}

/** Circular gauge (single value 0..1). */
export function Gauge({
  value,
  size = 96,
  stroke = PIVOT,
  ariaLabel,
}: {
  value: number;
  size?: number;
  stroke?: string;
  ariaLabel: string;
}) {
  const reduce = useReduce();
  const { ref, seen } = useInView<SVGSVGElement>(0.4);
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * Math.max(0, Math.min(1, value));
  const animate = !reduce && seen;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel}
    >
      <title>{ariaLabel}</title>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={HAIRLINE} strokeWidth={3} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={animate ? c - dash : c}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: reduce
            ? "none"
            : "stroke-dashoffset 1400ms cubic-bezier(0.165, 0.84, 0.44, 1)",
        }}
      />
    </svg>
  );
}

/** Tiny histogram (7 bars). */
export function Histogram({
  bars,
  width = 110,
  height = 56,
  stroke = PIVOT,
  ariaLabel,
}: {
  bars: number[];
  width?: number;
  height?: number;
  stroke?: string;
  ariaLabel: string;
}) {
  const reduce = useReduce();
  const { ref, seen } = useInView<SVGSVGElement>(0.4);
  const max = Math.max(...bars) || 1;
  const gap = 4;
  const bw = (width - gap * (bars.length - 1)) / bars.length;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
    >
      <title>{ariaLabel}</title>
      {bars.map((v, i) => {
        const h = (v / max) * (height - 4);
        const x = i * (bw + gap);
        const y = height - h;
        return (
          <rect
            key={i}
            x={x}
            y={!reduce && seen ? y : height}
            width={bw}
            height={!reduce && seen ? h : 0}
            fill={stroke}
            fillOpacity={0.9}
            rx={1}
            style={{
              transition: reduce
                ? "none"
                : `y 800ms cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 50}ms, height 800ms cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 50}ms`,
            }}
          />
        );
      })}
    </svg>
  );
}

export const COLORS = { pivot: PIVOT, deep: DEEP, turq: TURQ, hairline: HAIRLINE };
