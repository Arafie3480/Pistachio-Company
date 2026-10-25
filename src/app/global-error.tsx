"use client";

import Link from "next/link";
import { brand } from "@/lib/site";
import "./globals.css";

/**
 * Root error boundary — must provide its own html/body (replaces root layout).
 * Keep copy factual and recovery-oriented; no invented company claims.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="site-atmosphere flex min-h-svh flex-col font-sans text-foreground antialiased">
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-28 sm:px-8">
          <p className="section-label">Error</p>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Something went wrong
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {brand.name} could not load this page. Try again, or return home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand"
            >
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
