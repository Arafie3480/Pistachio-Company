import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { brand, imagery } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${brand.name} — Iranian pistachio export under ${brand.legalNameEn}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About the company"
        lead="A pistachio export house built around clarity, grade discipline, and long-term buyer relationships."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Green Diamond Farm
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {brand.name} is the export brand of {brand.legalNameEn} (
              {brand.legalNameFa}) — focused on Iranian pistachios for
              importers, distributors, and private-label partners who need
              predictable quality more than a loud story.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We present varieties honestly, keep contact paths short, and aim
              for the kind of first impression foreign buyers trust: calm,
              competent, and ready to do business.
            </p>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
            <Image
              src={imagery.orchard}
              alt="Agricultural landscape — placeholder until company photography is provided"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            History & credibility
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            {/* TODO(client): replace with verified founding year, milestones, certifications, and markets served */}
            The details below are provisional until the client confirms dates,
            certifications, and market history.
          </p>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Origin
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                Iranian pistachio trade under {brand.legalNameEn}. Exact
                founding year and ownership timeline —{" "}
                <span className="text-muted-foreground">TODO for client</span>.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                What we stand on
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                Grade consistency, clear export communication, and varieties
                that map to real buyer demand — from premium long kernels to
                volume Fandoghi and processed lines.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Certifications
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                Certificates and audit documents will be listed here once
                provided.{" "}
                <span className="text-muted-foreground">
                  TODO: logos / PDF assets from client
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Markets
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                International wholesale focus. Destination countries and key
                partner types —{" "}
                <span className="text-muted-foreground">TODO for client</span>.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
