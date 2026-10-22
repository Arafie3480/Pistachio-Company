/**
 * Shared site constants for Green Diamond Farm.
 * Mark client-supplied fields clearly until confirmed.
 * UI copy lives in messages/*.json (next-intl).
 */

export const brand = {
  name: "Green Diamond Farm",
  legalNameFa: "بازرگانی حسینی نوه",
  legalNameEn: "Hosseini Naveh",
  domain: "greendiamondfarm.com",
} as const;

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
 * Provisional experience years — TODO(client): refine when exact timeline is confirmed.
 * Edit these numbers only; About page + all locales interpolate them.
 */
export const historyYears = {
  agriculture: 50,
  pistachioTrade: 40,
  export: 30,
} as const;

export const contact = {
  // TODO(client): confirm spelling — client once typed "greendimond"; defaulting to diamond to match domain
  email: "export@greendiamondfarm.com",
  /** Temporary personal line until a virtual / business number is ready. */
  phone: "+989361814577",
  phoneDisplay: "+98 936 181 4577",
  whatsappUrl: "https://wa.me/989361814577",
  /** Honest warehouse location only — no invented city/postal beyond Motahari 52. */
  addressLine: "Warehouse, Motahari 52",
  addressLineFa: "انبار، مطهری ۵۲",
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
 * Hero / atmosphere imagery — verified pistachio Unsplash assets (+ local mirrors in public/imagery).
 * TODO(client): replace with owned orchard / warehouse / product photography.
 * Banned IDs: photo-1508747703725 (onions), photo-1615485290382 (broccoli).
 */
export const imagery = {
  /** Full-bleed in-shell pistachios for brand-first hero. */
  hero:
    "https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=2400&q=80",
  /** Export-scale shelled kernels for About (on-topic stand-in until orchard photos). */
  orchard:
    "https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&w=1600&q=80",
  /** Shelled kernels for catalog / shipment section. */
  product:
    "https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&w=1600&q=80",
  /** Interior page atmosphere — in-shell harvest texture. */
  harvest:
    "https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1600&q=80",
  /** Social share fallback when generated OG image is unavailable. */
  og: "https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=1200&h=630&q=80",
} as const;
