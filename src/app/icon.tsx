import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 6,
        }}
      >
        O
      </div>
    ),
    { ...size },
  );
}
