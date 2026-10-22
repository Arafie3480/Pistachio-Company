import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { absoluteUrl, languageAlternates, sitePathnames } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitePathnames.flatMap((pathname) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, pathname),
      lastModified,
      changeFrequency: pathname === "" ? "weekly" : "monthly",
      priority: pathname === "" ? 1 : 0.8,
      alternates: {
        languages: languageAlternates(pathname),
      },
    })),
  );
}
