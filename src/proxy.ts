import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match everything except: API routes, Next internals, files with an extension (assets),
  // and the root-level metadata routes Next generates from file conventions
  // (opengraph-image, icon, apple-icon, sitemap.xml, robots.txt).
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)",
  ],
};
