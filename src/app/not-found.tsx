import "./globals.css";

// Root-level not-found. The locale layout normally serves the localized 404
// (`src/app/[locale]/not-found.tsx`); this fires only for paths that bypass
// the locale segment entirely (e.g. unmatched assets). Kept minimal and
// dependency-free so it cannot itself fail.
export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          backgroundColor: "#FBFAF7",
          color: "#1A2024",
          fontFamily:
            "'IBM Plex Sans Arabic', 'IBM Plex Sans', system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "32rem", width: "100%" }}>
          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#0F63A5",
              marginBottom: "1rem",
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            الصفحة غير موجودة · Page not found
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "rgba(26,32,36,0.75)",
              marginBottom: "1.5rem",
            }}
          >
            ربّما تكون الصفحة قد نُقلت أو حُذفت. The page may have moved or
            been removed.
          </p>
          <a
            href="/ar"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: "10px",
              backgroundColor: "#2391A0",
              color: "#FBFAF7",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            العودة للرئيسية / Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
