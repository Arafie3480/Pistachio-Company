import type { Metadata } from "next";
import { locales, routing, type Locale } from "@/i18n/routing";
import { brand, imagery } from "@/lib/site";

/** Canonical production origin — DNS cutover still pending. */
export const siteUrl = `https://${brand.domain}`;

/** App pathnames without locale prefix (home = ""). */
export const sitePathnames = ["", "/about", "/products", "/contact"] as const;
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
  imageUrl = imagery.og,
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
