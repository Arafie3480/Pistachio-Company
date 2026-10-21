import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { brand, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the ${brand.name} export desk — email, WhatsApp, and office address.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        lead="Reach the export desk for grades, samples, packing, and shipment planning."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="space-y-10">
            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-brand">
                <Mail className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  Email
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 inline-block text-base text-foreground/90 transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  {/* TODO(client): confirm mailbox spelling greendiamond vs greendimond */}
                  TODO: confirm spelling with client (domain uses{" "}
                  <span className="font-medium">diamond</span>).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-brand">
                <MessageCircle className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  WhatsApp
                </h2>
                <p className="mt-1 text-base text-foreground/90">
                  {contact.whatsappLabel}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-3 h-9"
                  // TODO(client): replace href with https://wa.me/<E164>
                >
                  <a href={contact.whatsappUrl}>Open WhatsApp (pending number)</a>
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">
                  Placeholder until the client provides the business number.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-brand">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  Office
                </h2>
                <p className="mt-1 text-base text-foreground/90">
                  {contact.addressLine}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {/* TODO(client): full street, city, postal code, country */}
                  {contact.addressNote}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-sm border border-border/80 bg-surface px-6 py-8 sm:px-8">
            <h2 className="font-heading text-xl font-semibold text-ink">
              What to include
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To speed up a quote, mention variety, approximate volume,
              preferred packing, and destination port or country.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/85">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                Variety / program (e.g. Akbari, kernels)
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                Volume and timing window
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                Destination and any label requirements
              </li>
            </ul>
            <Button asChild className="mt-8 h-10 w-full sm:w-auto">
              <a href={`mailto:${contact.email}?subject=Export%20inquiry%20—%20Green%20Diamond%20Farm`}>
                Email the export desk
              </a>
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
