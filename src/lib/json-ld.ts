import { brand, contact, people } from "@/lib/site";
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
