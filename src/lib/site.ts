/**
 * Shared site constants for Green Diamond Farm.
 * Mark client-supplied fields clearly until confirmed.
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
  whatsappLabel: "WhatsApp (number TBD)",
  // TODO(client): full street address, city, postal code
  addressLine: "Motahari 52",
  addressNote: "Full address pending — TODO for client",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;

export const products = [
  {
    slug: "ahmad-aghaei",
    name: "Ahmad Aghaei",
    summary:
      "Long, elegant kernels with a refined flavor profile — favored by premium retail and gift markets.",
  },
  {
    slug: "akbari",
    name: "Akbari",
    summary:
      "Large, elongated nuts with strong visual presence — a staple for high-end wholesale buyers.",
  },
  {
    slug: "fandoghi",
    name: "Fandoghi",
    summary:
      "Round, versatile Iranian pistachio — reliable volume for roasting, packing, and everyday trade.",
  },
  {
    slug: "kaleh-ghouchi",
    name: "Kaleh Ghouchi",
    summary:
      "Jumbo, bold shape with excellent shell appeal — selected for markets that value size and look.",
  },
  {
    slug: "dahan-bast",
    name: "Dahan Bast",
    summary:
      "Closed-shell pistachios suited to processing and kernel production where integrity matters.",
  },
  {
    slug: "kernels",
    name: "Kernels",
    summary:
      "Shelled pistachio kernels prepared for confectionery, ice cream, bakery, and industrial use.",
  },
  {
    slug: "salted-roasted",
    name: "Salted & roasted",
    summary:
      "Ready-to-eat roasted pistachios — salted or plain — for retail packs and private-label programs.",
  },
] as const;

/** Hero / atmosphere imagery — replace with brand photography when available. */
export const imagery = {
  // TODO(client): replace with owned orchard / warehouse / product photography
  hero:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=2400&q=80",
  orchard:
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80",
  product:
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1600&q=80",
} as const;
