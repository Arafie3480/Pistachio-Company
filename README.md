# Green Diamond Farm

Export website for **بازرگانی حسینی نوه** (Hosseini Naveh) — pistachio export brand **Green Diamond Farm**.

- **Domain:** [greendiamondfarm.com](https://greendiamondfarm.com) (WordPress live today; this Next.js app is the cutover target)
- **GitHub:** [Arafie3480/Pistachio-Company](https://github.com/Arafie3480/Pistachio-Company)
- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · next-intl · shadcn/ui

## Delivery status

Ready for host import and client review. The marketing site is multilingual, indexed for SEO, and build-verified by CI.

| Area | Status |
|------|--------|
| Pages (Home, About, Products, Contact, Privacy) | Done — 6 locales (EN default + AR RTL, TR, ZH, HI, RU) |
| Contact (email, phone, WhatsApp, warehouse) | Live from `src/lib/site.ts` |
| SEO (canonical, hreflang, sitemap, robots, OG, Organization + catalog JSON-LD) | Done |
| Security / privacy (headers, CI least-privilege, first-party OG, privacy page) | Done |
| A11y (skip link, `aria-current`, reduced motion, locale + root 404/error) | Done |
| Brand mark (suggested diamond + pistachio) | Shipped — replace when client logo arrives |
| Contact CTAs (mailto, tel, WhatsApp with inquiry prefill) | Done |
| CI (`npm run lint` + `npm run build` + `npm run smoke:ci`, `contents: read`) | Done |
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

## Client demo pack

| Page | URL |
|------|-----|
| Home EN | http://127.0.0.1:4321/en |
| Products | http://127.0.0.1:4321/en/products |
| Home AR (RTL) | http://127.0.0.1:4321/ar |
| Contact | http://127.0.0.1:4321/en/contact |

- Handoff: [docs/client-demo-handoff.md](docs/client-demo-handoff.md)
- Paste-ready client message: [docs/demo-message-for-client.md](docs/demo-message-for-client.md)
- Public URL without Claim SMS: [docs/vercel-sms-bypass.md](docs/vercel-sms-bypass.md) (Vercel → Continue with GitHub → Import this repo)
- Screenshots: `media/demo-home-en.png`, `media/demo-products-en.png`, `media/demo-home-ar.png`, `media/demo-contact-en.png`

| Locale | Path prefix |
|--------|-------------|
| English (default) | `/`, `/about`, `/products`, `/contact` |
| Arabic (RTL) | `/ar`, `/ar/about`, … |
| Turkish | `/tr` … |
| Chinese | `/zh` … |
| Hindi | `/hi` … |
| Russian | `/ru` … |

```bash
npm run build    # production build
npm start        # serve build on :4321
npm run smoke    # HTTP acceptance checks against :4321 (start must be running)
npm run smoke:ci # start server, smoke, tear down (used by CI)
```

Smoke after build/start: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon`, `/contact`, `/privacy`, `/ar` — or run `npm run smoke` / `npm run smoke:ci`.

Copy `.env.example` only if you add overrides — **no env vars are required** for this marketing site.

## Tunable company facts

Edit `src/lib/site.ts` only:

- `historyYears` — agriculture / trade / export years
- `people` — founder & CEO names
- `contact` — email, phone, WhatsApp URL, warehouse line (**do not paste phone digits into README or issues**)
- Suggested brand mark — `public/brand/mark.svg` + `src/components/brand-mark.tsx` (replace when client logo arrives)

UI copy lives in `messages/*.json` (next-intl).

## Deploy (non-Iran host — LinkedIn-friendly)

**Primary path:** import this GitHub repo in a host dashboard — no CLI login required.

### Vercel (recommended)

1. Open [Vercel → New Project](https://vercel.com/new).
2. Import **`Arafie3480/Pistachio-Company`**.
3. Framework: **Next.js**. Root: repo root. **No env vars** required.
4. Deploy. Later pushes to `main` redeploy when the project stays linked.
5. Preview URL appears on the first deploy; share that until DNS cutover.

### Alternatives

- **Netlify** — New site → Import from Git → same repo → Next.js runtime.
- **Cloudflare Pages** — Connect GitHub → framework preset Next.js (or `@cloudflare/next-on-pages` if you standardize on that later).

CI (`.github/workflows/ci.yml`) runs `npm ci` + `npm run lint` + `npm run build` + `npm run smoke:ci` on push/PR to `main` with `contents: read`.

### DNS cutover (when ready — do not change client DNS yet)

1. Keep current Iran WordPress host serving `greendiamondfarm.com` until the Next.js preview is signed off.
2. In the host dashboard, add custom domain `greendiamondfarm.com` (+ `www` if used).
3. At the DNS provider, point apex / `www` to the host’s records.
4. Wait for TLS + propagation; then verify `/`, `/ar`, `/sitemap.xml`, and contact CTAs.
5. Only then retire or redirect the WordPress install.

Prefer a **non-Iran** host if LinkedIn eligibility matters.

## Products

**In-shell:** Ahmad Aghaei · Akbari · Fandoghi · Kaleh Ghouchi · Dahan Bast  

**Processed:** kernels · salted & roasted

## Client follow-ups (optional polish)

These do not block deploy; they improve go-live accuracy:

- Dedicated virtual / business WhatsApp line (replace provisional number in `src/lib/site.ts` → `contact`)
- Full office address beyond Motahari 52 warehouse
- Confirm export email spelling (`greendiamond` vs `greendimond`)
- Official logo file (site ships a **suggested** diamond + pistachio mark for delivery)
- Owned product / orchard photography; certificates
- Confirm exact experience years in `historyYears`
- Import repo on Vercel (or peer) and point DNS when signed off
