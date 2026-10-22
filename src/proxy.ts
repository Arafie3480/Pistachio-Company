import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip locale rewrite for App Router metadata image routes (no file extension).
  matcher: [
    "/((?!api|trpc|_next|_vercel|icon|apple-icon|opengraph-image|.*\\..*).*)",
  ],
};
