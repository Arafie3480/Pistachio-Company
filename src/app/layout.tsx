import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/seo";

/**
 * Root pass-through — html/body live in [locale]/layout for lang + dir.
 * metadataBase here so generated icons / OG resolve against production host
 * (or NEXT_PUBLIC_SITE_URL on preview).
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
