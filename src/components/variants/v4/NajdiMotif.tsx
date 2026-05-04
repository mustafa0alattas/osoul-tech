/**
 * Variant /4 — Najdi Modern motif.
 *
 * A six-fold geometric pattern generated entirely from primitives — no
 * raster, no clip-art. The motif is composed of:
 *   - a six-pointed star (two interlocking triangles, hairline)
 *   - a concentric hexagon
 *   - six radial spokes that anchor the star to its hex frame
 *
 * The result reads as contemporary Najdi geometry to a Saudi viewer
 * without falling into tourism-poster cliché. Stroke is Hairline tinted
 * with the chosen brand color at the requested opacity.
 *
 * Use as a divider (small, repeated) OR as a single oversize hero anchor.
 */
type Props = {
  size?: number;
  /** stroke color hex */
  stroke?: string;
  /** stroke opacity 0..1 */
  opacity?: number;
  /** stroke width in user units (the SVG viewBox is -50..50) */
  strokeWidth?: number;
  className?: string;
};

export function NajdiMotif({
  size = 64,
  stroke = "#1A2024",
  opacity = 0.5,
  strokeWidth = 0.6,
  className,
}: Props) {
  // Triangle vertices on a circle of radius r
  const r = 38;
  const vertices = (offsetDeg: number) =>
    Array.from({ length: 3 }, (_, i) => {
      const a = ((i * 120 + offsetDeg) * Math.PI) / 180;
      return [r * Math.cos(a), r * Math.sin(a)] as const;
    });
  const tri1 = vertices(-90);
  const tri2 = vertices(30);
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180;
    const rr = 24;
    return [rr * Math.cos(a), rr * Math.sin(a)] as const;
  });
  const points = (pts: ReadonlyArray<readonly [number, number]>) =>
    pts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
      className={className}
      style={{ color: stroke, opacity }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Two interlocking triangles → six-pointed star */}
        <polygon points={points(tri1)} />
        <polygon points={points(tri2)} />
        {/* Inner hexagon */}
        <polygon points={points(hex)} />
        {/* Radial spokes */}
        {hex.map((h, i) => (
          <line key={i} x1={0} y1={0} x2={h[0].toFixed(2)} y2={h[1].toFixed(2)} />
        ))}
        {/* Outer hairline ring */}
        <circle cx={0} cy={0} r={46} />
      </g>
    </svg>
  );
}

/**
 * Section-divider strip: a hairline rule with the motif centered on it.
 * Use ABOVE every section (per spec).
 */
export function NajdiDivider({
  className,
  motifSize = 32,
}: {
  className?: string;
  motifSize?: number;
}) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className ?? ""}`}>
      <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
      <NajdiMotif size={motifSize} stroke="#0F63A5" opacity={0.45} strokeWidth={0.7} />
      <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
    </div>
  );
}
