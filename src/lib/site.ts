/**
 * Shared site constants for Green Diamond Farm.
 * Mark client-supplied fields clearly until confirmed.
 * UI copy lives in messages/*.json (next-intl).
 */

export const brand = {
  name: "Green Diamond Farm",
  /** Persian display name for FA/AR chrome (official lockup still English mark). */
  nameFa: "گرین دایموند فارم",
  legalNameFa: "بازرگانی حسینی نوه",
  legalNameEn: "Hosseini Naveh",
  /** Origin city shown on official lockup */
  region: "Rafsanjan",
  regionFa: "رفسنجان",
  domain: "greendiamondfarm.com",
  /** Footer copyright year — keep static for Cache Components prerender. */
  copyrightYear: 2026,
  /** Client-supplied lockup (public/brand). */
  logoPath: "/brand/logo-official-web.jpg",
  logoNavPath: "/brand/logo-nav.png",
  logoSquarePath: "/brand/logo-square.png",
} as const;

/** Prefer Persian legal name + region on RTL locales (FA/AR buyer review). */
export function brandLegalForLocale(locale: string) {
  const preferFa = locale === "fa" || locale === "ar";
  return {
    preferFa,
    displayName: preferFa ? brand.nameFa : brand.name,
    legalName: preferFa ? brand.legalNameFa : brand.legalNameEn,
    legalNameEn: brand.legalNameEn,
    legalNameFa: brand.legalNameFa,
    region: preferFa ? brand.regionFa : brand.region,
  } as const;
}

/** Leadership — names from client (2026-10-22). */
export const people = {
  founder: {
    nameFa: "اصغر حسینی نوه",
    nameEn: "Asghar Hosseini Naveh",
  },
  ceo: {
    nameFa: "فرامرز حسینی نوه",
    nameEn: "Faramarz Hosseini Naveh",
  },
} as const;

/**
 * Company-stated experience years (edit when the client confirms exact dates).
 * About page + all locales interpolate these numbers only.
 */
export const historyYears = {
  agriculture: 50,
  pistachioTrade: 40,
  export: 30,
} as const;

export const contact = {
  // Confirm spelling with client if mailbox bounces (once typed "greendimond").
  email: "export@greendiamondfarm.com",
  /**
   * Export desk phone / WhatsApp — keep contact usable until a dedicated
   * business line is provided. Digits stay in site config only (not README).
   */
  phone: "+989361814577",
  phoneDisplay: "+98 936 181 4577",
  whatsappUrl: "https://wa.me/989361814577",
  /**
   * Warehouse street known from client; city from official lockup (Rafsanjan).
   * Expand street/postal only when the client confirms fuller address.
   */
  addressLine: "Warehouse, Motahari 52, Rafsanjan, Iran",
  addressLineFa: "انبار، مطهری ۵۲، رفسنجان، ایران",
  addressLocality: "Rafsanjan",
  addressCountry: "IR",
} as const;

export const productSlugs = [
  "ahmad-aghaei",
  "akbari",
  "fandoghi",
  "kaleh-ghouchi",
  "dahan-bast",
  "kernels",
  "salted-roasted",
] as const;

export type ProductSlug = (typeof productSlugs)[number];

/** Export catalog groups — drives Products page sectioning. */
export const productGroups = [
  {
    id: "inShell" as const,
    slugs: [
      "ahmad-aghaei",
      "akbari",
      "fandoghi",
      "kaleh-ghouchi",
      "dahan-bast",
    ] as const satisfies readonly ProductSlug[],
  },
  {
    id: "processed" as const,
    slugs: ["kernels", "salted-roasted"] as const satisfies readonly ProductSlug[],
  },
] as const;

/**
 * Hero / atmosphere imagery — verified pistachio Unsplash stand-ins until
 * the client supplies owned orchard / warehouse / product photography.
 * Banned IDs: photo-1508747703725 (onions), photo-1615485290382 (broccoli).
 */
export const imagery = {
  /** Full-bleed in-shell pistachios for brand-first hero. */
  hero:
    "https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=2400&q=80",
  /** Shelled kernels for About (stand-in until owned orchard photos). */
  orchard:
    "https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&w=1600&q=80",
  /** In-shell texture for catalog strip — distinct from About kernels. */
  product:
    "https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1600&q=80",
  /** Interior page atmosphere — in-shell harvest texture. */
  harvest:
    "https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1600&q=80",
} as const;
