import type { Metadata } from "next";
import { locales, routing, type Locale } from "@/i18n/routing";
import { brand } from "@/lib/site";

/**
 * Canonical origin for absolute URLs / sitemap / robots.
 * Override with NEXT_PUBLIC_SITE_URL on preview hosts before DNS cutover.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  `https://${brand.domain}`;

/**
 * First-party OG card from `src/app/opengraph-image.tsx`.
 * Prefer this over third-party Unsplash URLs so social crawlers do not hit
 * an external CDN (and so the share image is under our control).
 */
export const ogImagePath = "/opengraph-image" as const;

/** App pathnames without locale prefix (home = ""). */
export const sitePathnames = [
  "",
  "/about",
  "/products",
  "/contact",
  "/privacy",
] as const;
export type SitePathname = (typeof sitePathnames)[number];

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_SA",
  tr: "tr_TR",
  zh: "zh_CN",
  hi: "hi_IN",
  ru: "ru_RU",
};

export function localizedPath(locale: string, pathname: SitePathname | string = ""): string {
  const clean = pathname === "/" ? "" : pathname;
  if (locale === routing.defaultLocale) {
    return clean || "/";
  }
  return `/${locale}${clean}`;
}

export function absoluteUrl(locale: string, pathname: SitePathname | string = ""): string {
  const path = localizedPath(locale, pathname);
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

/** hreflang map including x-default → English (as-needed prefix). */
export function languageAlternates(
  pathname: SitePathname | string = "",
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(locale, pathname);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, pathname);
  return languages;
}

export function buildPageMetadata({
  locale,
  pathname = "",
  title,
  description,
  /** Relative path preferred — Next resolves against metadataBase. */
  imageUrl = ogImagePath,
}: {
  locale: string;
  pathname?: SitePathname | string;
  title: string;
  description: string;
  imageUrl?: string;
}): Metadata {
  const url = absoluteUrl(locale, pathname);
  const ogLocale = ogLocaleMap[locale as Locale] ?? "en_US";
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(pathname),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url,
      siteName: brand.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${brand.name} — Iranian pistachio export`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
