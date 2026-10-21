import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { brand, imagery, products } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* One composition: brand, headline, line, CTAs, full-bleed visual */}
      <section className="relative min-h-[100svh] overflow-hidden bg-brand text-brand-foreground">
        <Image
          src={imagery.hero}
          alt="Orchard landscape — placeholder until brand photography is provided"
          fill
          priority
          sizes="100vw"
          className="animate-gd-hero-media object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand/92 via-brand/78 to-brand/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-brand/35"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-28 pb-16 sm:justify-center sm:px-8 sm:pb-24">
          <p className="animate-gd-fade-up font-heading text-3xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {brand.name}
          </p>
          <h1 className="animate-gd-fade-up animate-gd-delay-1 mt-5 max-w-xl font-heading text-2xl font-medium tracking-tight text-balance text-brand-foreground/95 sm:text-3xl md:text-[2.15rem] md:leading-snug">
            Iranian pistachios, packed for buyers who value consistency.
          </h1>
          <p className="animate-gd-fade-up animate-gd-delay-2 mt-4 max-w-md text-base leading-relaxed text-brand-foreground/75 sm:text-lg">
            Export partnership under {brand.legalNameEn} — clear grades,
            dependable supply, and a calm path from orchard to container.
          </p>
          <div className="animate-gd-fade-up animate-gd-delay-3 mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 bg-brand-foreground px-5 text-brand transition-transform hover:scale-[1.02] hover:bg-brand-foreground/90 active:scale-[0.99]"
            >
              <Link href="/products">View products</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 border-brand-foreground/35 bg-transparent px-5 text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            >
              <Link href="/contact">Contact export desk</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built for foreign buyers
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We keep the story simple: graded Iranian pistachios, transparent
            communication, and a contact path that answers when you are ready to
            inquire. No noise — just a brand you can put in front of your
            customers.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          {[
            {
              title: "Varieties that matter",
              body: "Ahmad Aghaei, Akbari, Fandoghi, Kaleh Ghouchi, Dahan Bast — plus kernels and roasted lines.",
            },
            {
              title: "Export-minded",
              body: "Documentation, packing, and grade clarity oriented toward international wholesale and private label.",
            },
            {
              title: "Direct contact",
              body: "Reach the export desk by email or WhatsApp when you need samples, specs, or a quote.",
            },
          ].map((item) => (
            <li key={item.title}>
              <h3 className="font-heading text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border/70 bg-surface/70">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={imagery.product}
              alt="Pistachios — placeholder product imagery pending brand assets"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink">
              From shell to shipment
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Explore our full range — including in-shell varieties, kernels, and
              salted & roasted programs — then tell us what your market needs.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground/85">
              {products.slice(0, 5).map((p) => (
                <li key={p.slug} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  {p.name}
                </li>
              ))}
              <li className="flex gap-2 text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-muted" />
                Kernels · Salted & roasted
              </li>
            </ul>
            <Button asChild className="mt-8 h-10 transition-transform hover:scale-[1.02]">
              <Link href="/products">See all products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink">
            Ready to talk supply?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Send your target variety, volume, and destination. We will respond
            from the export desk with next steps.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-11 transition-transform hover:scale-[1.02]"
          >
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
