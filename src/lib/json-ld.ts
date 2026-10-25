import { brand, contact, people, productGroups, productSlugs } from "@/lib/site";
import { siteUrl } from "@/lib/seo";

/** Organization JSON-LD for export-desk SEO (no invented certifications or markets). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    alternateName: [brand.legalNameEn, brand.legalNameFa],
    url: siteUrl,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLine,
      addressCountry: "IR",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contact.email,
        telephone: contact.phone,
        availableLanguage: ["en", "ar", "tr", "zh", "hi", "ru", "fa"],
      },
    ],
    founder: {
      "@type": "Person",
      name: people.founder.nameEn,
      alternateName: people.founder.nameFa,
    },
    employee: {
      "@type": "Person",
      name: people.ceo.nameEn,
      alternateName: people.ceo.nameFa,
      jobTitle: "CEO",
    },
    description:
      "Iranian pistachio export — in-shell varieties, kernels, and roasted programs for international buyers.",
    areaServed: "Worldwide",
    knowsAbout: [
      "Iranian pistachio",
      "Ahmad Aghaei",
      "Akbari",
      "Fandoghi",
      "Kaleh Ghouchi",
      "pistachio kernels",
    ],
  } as const;
}

/** Catalog outline for Products page — names only, no invented prices or availability. */
export function productCatalogJsonLd(
  productNames: Record<(typeof productSlugs)[number], string>,
) {
  const orderedSlugs = productGroups.flatMap((group) => [...group.slugs]);
  const items = orderedSlugs.map((slug, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: productNames[slug],
    url: `${siteUrl}/products`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brand.name} pistachio export catalog`,
    itemListElement: items,
  } as const;
}

/** WhatsApp deep link with optional prefilled inquiry text. */
export function whatsappHref(prefillText?: string) {
  if (!prefillText) return contact.whatsappUrl;
  return `${contact.whatsappUrl}?text=${encodeURIComponent(prefillText)}`;
}
