/**
 * Procedural Sadu (السدو) weaving motif.
 *
 * Sadu is the traditional Bedouin loom-weaving of the Najd: rigid horizontal
 * warps interrupted by vertical wefts, with stylised lozenges, hourglass
 * triangles, and zigzag bands woven from a strict palette. The geometry is
 * built from straight lines only — no curves, no flourishes — because the
 * loom itself cannot produce curves.
 *
 * Everything here is generated from primitives (line / polyline / polygon)
 * so the motif scales cleanly from a 12px hairline strip to a 5120px tiled
 * overlay without ever rasterising. No external assets, no clip-art.
 */

type SaduCommonProps = {
  size?: number;
  strokeColor?: string;
  fillColor?: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
};

/* ───────────────────────────── strip ─────────────────────────────
 * Horizontal Sadu band — alternating hourglass lozenges over a pair
 * of parallel warp threads. Designed to tile via SVG <pattern>, so a
 * 12px strip and a viewport-wide overlay use the same primitive.
 */

export function SaduStrip({
  height = 12,
  strokeColor = "currentColor",
  opacity = 0.06,
  strokeWidth = 1,
  className,
}: {
  height?: number;
  strokeColor?: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
}) {
  // Tile is twice the height (≈ aspect ratio of the lozenge unit on a real loom).
  const tileW = height * 2;
  const tileH = height;
  const mid = tileH / 2;

  return (
    <svg
      role="presentation"
      aria-hidden="true"
      width="100%"
      height={tileH}
      viewBox={`0 0 ${tileW} ${tileH}`}
      preserveAspectRatio="none"
      className={className}
      style={{ display: "block", color: strokeColor, opacity }}
    >
      <defs>
        <pattern
          id="sadu-strip-tile"
          x="0"
          y="0"
          width={tileW}
          height={tileH}
          patternUnits="userSpaceOnUse"
        >
          {/* Two parallel warps (horizontal hairlines) */}
          <line
            x1="0"
            y1={strokeWidth / 2}
            x2={tileW}
            y2={strokeWidth / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <line
            x1="0"
            y1={tileH - strokeWidth / 2}
            x2={tileW}
            y2={tileH - strokeWidth / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          {/* Hourglass lozenge — two triangles meeting on the warp */}
          <polyline
            points={`0,${tileH} ${tileW / 4},${mid} ${tileW / 2},${tileH} ${(tileW * 3) / 4},${mid} ${tileW},${tileH}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinejoin="miter"
          />
          <polyline
            points={`0,0 ${tileW / 4},${mid} ${tileW / 2},0 ${(tileW * 3) / 4},${mid} ${tileW},0`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinejoin="miter"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height={tileH} fill="url(#sadu-strip-tile)" />
    </svg>
  );
}

/* ───────────────────────────── medallion ─────────────────────────────
 * Six-fold radial Sadu — hexagonal star inscribed with a smaller hexagon
 * and three diagonals. Used for the procession medallions in How-It-Works.
 * Stroke-only, so the step number sits cleanly inside.
 */

export function SaduMedallion({
  size = 60,
  strokeColor = "currentColor",
  opacity = 0.5,
  strokeWidth = 1.5,
  className,
}: SaduCommonProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - strokeWidth;

  // Six points around the perimeter (60° apart, starting at top).
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2; // -90° = top
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  });

  // Inner hexagon at 0.55× radius — the Sadu-typical concentric hex.
  const innerR = r * 0.55;
  const innerPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + innerR * Math.cos(angle), cy + innerR * Math.sin(angle)] as const;
  });

  return (
    <svg
      role="presentation"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ color: strokeColor, opacity }}
    >
      {/* Outer hexagon */}
      <polygon
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      />
      {/* Inner hexagon */}
      <polygon
        points={innerPoints.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      />
      {/* Three diagonals connecting opposite vertices — the six-fold spokes */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={points[i][0]}
          y1={points[i][1]}
          x2={points[i + 3][0]}
          y2={points[i + 3][1]}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}

/* ───────────────────────────── corner ─────────────────────────────
 * Smallest mark: a single Sadu hourglass + flanking warp ticks.
 * Used as the corner sigil on Why-Us cards and Audience cards.
 */

export function SaduCorner({
  size = 24,
  strokeColor = "currentColor",
  opacity = 0.08,
  strokeWidth = 1,
  className,
}: SaduCommonProps) {
  return (
    <svg
      role="presentation"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ color: strokeColor, opacity }}
    >
      {/* Top + bottom warp ticks */}
      <line x1="2" y1="3" x2="22" y2="3" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="2" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Hourglass lozenge in the middle */}
      <polygon
        points="2,21 12,12 22,21"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      />
      <polygon
        points="2,3 12,12 22,3"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      />
    </svg>
  );
}
