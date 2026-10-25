import Image from "next/image";
import { imagery } from "@/lib/site";

type PageHeroProps = {
  title: string;
  lead: string;
};

/** Interior page intro — brand atmosphere, one headline, one supporting line. */
export function PageHero({ title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-brand text-brand-foreground">
      <div className="absolute inset-0 opacity-[0.28]">
        <Image
          src={imagery.harvest}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand/92 via-brand/78 to-brand/55 rtl:bg-gradient-to-l"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-brand/40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-14 sm:px-8 sm:pt-32 sm:pb-16">
        <h1 className="animate-gd-fade-up font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="animate-gd-fade-up animate-gd-delay-1 mt-4 max-w-2xl text-base leading-relaxed text-brand-foreground/80 sm:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}
