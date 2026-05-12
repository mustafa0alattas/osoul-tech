import { ImageResponse } from "next/og";

export const alt = "Osoul.Tech — Own a fraction of Saudi Arabia's real estate future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only by design. Arabic glyphs require a font with the right substitution
// lookups, which the bundled fallback in `next/og` does not currently support.
// When ready, fetch IBM Plex Sans Arabic at build time and pass it via the
// `fonts` option to render the Arabic wordmark.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBFAF7",
          padding: "72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#5A6168",
            fontSize: 24,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>Osoul.Tech</span>
          <span>Saudi Arabia</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#3D2C8D",
            }}
          >
            Osoul.Tech
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#1A2024",
              maxWidth: 980,
              lineHeight: 1.25,
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}
          >
            Own a fraction of Saudi Arabia&rsquo;s real estate future.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              height: 6,
              width: "100%",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #B19CD9 0%, #7851A9 50%, #3D2C8D 100%)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#5A6168",
              fontSize: 22,
            }}
          >
            <span>
              Within the regulatory sandbox of the General Authority for Real
              Estate
            </span>
            <span>osoul.tech</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
