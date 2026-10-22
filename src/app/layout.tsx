import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brand } from "@/lib/site";

/**
 * Root pass-through — html/body live in [locale]/layout for lang + dir.
 * metadataBase here so generated icons / OG resolve against production host.
 */
export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
