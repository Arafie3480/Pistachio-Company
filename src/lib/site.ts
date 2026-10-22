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

export const contact = {
  // TODO(client): confirm spelling — client once typed "greendimond"; defaulting to diamond to match domain
  email: "export@greendiamondfarm.com",
  // TODO(client): provide WhatsApp business number (E.164). Placeholder intentionally non-functional.
  whatsappUrl: "#whatsapp-todo",
  // TODO(client): full street address, city, postal code
  addressLine: "Motahari 52",
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

/** Hero / atmosphere imagery — replace with brand photography when available. */
export const imagery = {
  // TODO(client): replace with owned orchard / warehouse / product photography
  hero:
    "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=2400&q=80",
  orchard:
    "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&w=1600&q=80",
  product:
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1600&q=80",
  /** Social share fallback when generated OG image is unavailable. */
  og: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&h=630&q=80",
} as const;
