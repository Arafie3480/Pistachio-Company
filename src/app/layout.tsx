import type { ReactNode } from "react";

/**
 * Root pass-through — html/body live in [locale]/layout for lang + dir.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
