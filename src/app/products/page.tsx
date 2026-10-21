import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { brand, products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: `Pistachio varieties and programs from ${brand.name}: Ahmad Aghaei, Akbari, Fandoghi, Kaleh Ghouchi, Dahan Bast, kernels, salted & roasted.`,
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products"
        lead="In-shell varieties, kernels, and roasted programs — selected for international wholesale and private label."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="max-w-2xl text-sm text-muted-foreground">
          {/* TODO(client): add grade specs, sizes, packing, and product photos per SKU */}
          Product photography and detailed grade sheets will replace this
          outline once client assets arrive.
        </p>

        <ul className="mt-10 divide-y divide-border/80 border-y border-border/80">
          {products.map((product, index) => (
            <li
              key={product.slug}
              className="grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <span className="font-mono text-xs tracking-wider text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {product.name}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {product.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 max-w-xl">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Need a specific grade or pack?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell us variety, volume, and destination — we will confirm
            availability from the export desk.
          </p>
          <Button asChild className="mt-6 h-10 transition-transform hover:scale-[1.02]">
            <Link href="/contact">Request availability</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
