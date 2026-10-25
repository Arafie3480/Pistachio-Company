import type { MetadataRoute } from "next";
import { brand } from "@/lib/site";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    // Yandex Host directive expects hostname without scheme.
    host: brand.domain,
  };
}
