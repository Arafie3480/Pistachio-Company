type PageHeroProps = {
  title: string;
  lead: string;
};

/** Interior page intro — one purpose, one headline, one supporting line. */
export function PageHero({ title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-brand text-brand-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px 320px at 85% 0%, oklch(0.55 0.06 145 / 0.35), transparent 60%)",
        }}
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
