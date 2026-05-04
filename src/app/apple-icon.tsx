import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #31AE9C 0%, #2391A0 50%, #0F63A5 100%)",
          color: "#FBFAF7",
          fontSize: 124,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        O
      </div>
    ),
    { ...size },
  );
}
