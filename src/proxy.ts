import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip locale rewrite for App Router metadata image routes (no file extension).
  // Anchor icon/opengraph names so unrelated paths like /icons are not excluded.
  matcher: [
    "/((?!api|trpc|_next|_vercel|icon(?:$|/)|apple-icon(?:$|/)|opengraph-image(?:$|/)|.*\\..*).*)",
  ],
};
