import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Wraps next-intl's middleware so locale-redirect Location headers honor
 * the public host from X-Forwarded-Host / X-Forwarded-Proto. Without this,
 * platforms that bind the container to a non-public port (e.g. Railway on
 * :8080 behind its edge) leak that port into the Location header on the
 * `/` → `/ar` redirect. Every other route is unaffected; this only fires
 * when next-intl issues a 30x with a Location.
 */
export default function proxy(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);
  if (response.status !== 307 && response.status !== 308) return response;

  const location = response.headers.get("location");
  if (!location) return response;

  const xfHost = request.headers.get("x-forwarded-host");
  if (!xfHost) return response;

  try {
    const url = new URL(location, request.url);
    const xfProto = request.headers.get("x-forwarded-proto");
    url.host = xfHost; // strips any port appended by the internal bind
    if (xfProto) url.protocol = `${xfProto}:`;
    const fixed = NextResponse.redirect(url, response.status);
    response.cookies.getAll().forEach((c) => fixed.cookies.set(c));
    response.headers.forEach((v, k) => {
      if (k.toLowerCase() === "location" || k.toLowerCase() === "set-cookie") return;
      fixed.headers.set(k, v);
    });
    return fixed;
  } catch {
    return response;
  }
}

export const config = {
  // Match everything except: API routes, Next internals, files with an extension (assets),
  // and the root-level metadata routes Next generates from file conventions
  // (opengraph-image, icon, apple-icon, sitemap.xml, robots.txt).
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)",
  ],
};
