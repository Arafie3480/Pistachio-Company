# Green Diamond Farm

Export website for **بازرگانی حسینی نوه** (Hosseini Naveh) — pistachio export brand **Green Diamond Farm**.

- **Domain:** [greendiamondfarm.com](https://greendiamondfarm.com)
- **GitHub:** [Arafie3480/Pistachio-Company](https://github.com/Arafie3480/Pistachio-Company)
- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · next-intl · shadcn/ui

## Delivery status

Ready for host import and client review. The marketing site is multilingual, indexed for SEO, and build-verified by CI.

| Area | Status |
|------|--------|
| Pages (Home, About, Products, Contact) | Done — 6 locales (EN default + AR RTL, TR, ZH, HI, RU) |
| Contact (email, phone, WhatsApp, warehouse) | Live from `src/lib/site.ts` |
| SEO (canonical, hreflang, sitemap, robots, OG, Organization + catalog JSON-LD) | Done |
| Security baseline (headers, CI least-privilege, first-party OG) | Done |
| A11y (skip link, `aria-current`, reduced motion, locale + root 404) | Done |
| Contact CTAs (mailto, tel, WhatsApp with inquiry prefill) | Done |
| Custom logo / owned photography / certificates | Client assets pending |
| DNS cutover from WordPress | Out of scope until host + domain ready |

## Local setup

```bash
git clone https://github.com/Arafie3480/Pistachio-Company.git
cd Pistachio-Company
npm install
npm run dev
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

| Locale | Path prefix |
|--------|-------------|
| English (default) | `/`, `/about`, `/products`, `/contact` |
| Arabic (RTL) | `/ar`, `/ar/about`, … |
| Turkish | `/tr` … |
| Chinese | `/zh` … |
| Hindi | `/hi` … |
| Russian | `/ru` … |

```bash
npm run build   # production build
npm start       # serve build on :4321
```

Smoke after build/start: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon`, `/contact`, `/ar`.

## Tunable company facts

Edit `src/lib/site.ts` only:

- `historyYears` — agriculture / trade / export years
- `people` — founder & CEO names
- `contact` — email, phone, WhatsApp URL, warehouse line (**do not paste phone digits into README or issues**)

UI copy lives in `messages/*.json` (next-intl).

## Deploy

**Primary path:** import this GitHub repo in a host dashboard.

1. Open [Vercel → New Project](https://vercel.com/new) (or Netlify / Cloudflare Pages with Next.js support).
2. Import **`Arafie3480/Pistachio-Company`**.
3. Framework: **Next.js**. Root: repo root. **No env vars** required.
4. Deploy. Later pushes to `main` redeploy when the project stays linked.

CI (`.github/workflows/ci.yml`) runs `npm ci` + `npm run build` on push/PR to `main` with `contents: read`.

Prefer a **non-Iran** host if LinkedIn eligibility matters. Custom domain (`greendiamondfarm.com`) waits on WordPress cutover.

## Products

**In-shell:** Ahmad Aghaei · Akbari · Fandoghi · Kaleh Ghouchi · Dahan Bast  

**Processed:** kernels · salted & roasted

## Client follow-ups (optional polish)

These do not block deploy; they improve go-live accuracy:

- Dedicated virtual / business WhatsApp line (replace provisional number in `src/lib/site.ts` → `contact`)
- Full office address beyond Motahari 52 warehouse
- Confirm export email spelling (`greendiamond` vs `greendimond`)
- Owned logo, product photos, certificates
- Confirm exact experience years in `historyYears`
