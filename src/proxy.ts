import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Wraps next-intl's middleware so locale-redirect Location headers never
 * leak the container's internal bind port. Platforms like Railway terminate
 * SSL at the edge and forward to the container on a non-public port (e.g.
 * 8080); next-intl, building Location from `request.url`, copies that port
 * into the redirect. We rebuild the Location with the public host (from
 * X-Forwarded-Host when present) and force-strip the port, then carry the
 * X-Forwarded-Proto. No-op on local dev / Vercel where ports are absent.
 */
export default function proxy(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);
  if (response.status !== 307 && response.status !== 308) return response;

  const location = response.headers.get("location");
  if (!location) return response;

  let url: URL;
  try {
    url = new URL(location, request.url);
  } catch {
    return response;
  }

  const xfHost = request.headers.get("x-forwarded-host");
  const xfProto = request.headers.get("x-forwarded-proto");

  let mutated = false;
  if (xfHost && url.host !== xfHost.split(",")[0]?.trim()) {
    url.host = xfHost.split(",")[0]!.trim();
    mutated = true;
  }
  if (xfProto && `${xfProto}:` !== url.protocol) {
    url.protocol = `${xfProto.split(",")[0]!.trim()}:`;
    mutated = true;
  }
  if (url.port) {
    url.port = "";
    mutated = true;
  }

  if (!mutated) return response;

  const fixed = NextResponse.redirect(url, response.status);
  response.cookies.getAll().forEach((c) => fixed.cookies.set(c));
  response.headers.forEach((v, k) => {
    const lk = k.toLowerCase();
    if (lk === "location" || lk === "set-cookie") return;
    fixed.headers.set(k, v);
  });
  return fixed;
}

export const config = {
  // Match everything except: API routes, Next internals, files with an extension (assets),
  // and the root-level metadata routes Next generates from file conventions
  // (opengraph-image, icon, apple-icon, sitemap.xml, robots.txt).
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)",
  ],
};
