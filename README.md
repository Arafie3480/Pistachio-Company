# Green Diamond Farm

Export website for **بازرگانی حسینی نوه** (Hosseini Naveh) — pistachio export brand **Green Diamond Farm**.

- **Domain:** [greendiamondfarm.com](https://greendiamondfarm.com) (WordPress live today; this Next.js app is the cutover target)
- **GitHub:** [Arafie3480/Pistachio-Company](https://github.com/Arafie3480/Pistachio-Company)
- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · next-intl · shadcn/ui

## Goals

- Clean, simple, chic B2B site (not flashy)
- Locales: English (default), Arabic (RTL), Turkish, Chinese, Hindi, Russian
- Pages: Home, About, Products, Contact
- Contact: export email, temporary phone / WhatsApp, warehouse Motahari 52
- SEO: per-locale meta, `hreflang` alternates, Open Graph, favicon, `sitemap.xml`, `robots.txt`

## Local setup

```bash
git clone https://github.com/Arafie3480/Pistachio-Company.git
cd Pistachio-Company
npm install
npm run dev
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

## Client demo pack

Verified local show path (port **4321**, tip `353bdc6` lineage):

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
npm run build   # production build
npm start       # serve build on :4321
```

SEO check after build/start: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon`.

Copy `.env.example` only if you add overrides — **no env vars are required** for this marketing site.

## Tunable company facts

Edit `src/lib/site.ts`:

- `historyYears` — provisional agriculture / trade / export years
- `people` — founder & CEO names
- `contact` — email, phone, WhatsApp URL, warehouse line
- Suggested brand mark — `public/brand/mark.svg` + `src/components/brand-mark.tsx` (replace when client logo arrives)

UI copy lives in `messages/*.json` (next-intl).

## Deploy (non-Iran host — LinkedIn-friendly)

**Primary path:** import this GitHub repo in a host dashboard — no CLI login required.

### Vercel (recommended)

1. Open [Vercel → New Project](https://vercel.com/new).
2. Import **`Arafie3480/Pistachio-Company`** (GitHub).
3. Framework preset: **Next.js**. Root: repo root. **Env vars:** none.
4. Deploy. Later pushes to `main` redeploy automatically while the project stays linked.
5. Preview URL appears on the first deploy; share that until DNS cutover.

### Alternatives

- **Netlify** — New site → Import from Git → same repo → Next.js runtime.
- **Cloudflare Pages** — Connect GitHub → framework preset Next.js (or `@cloudflare/next-on-pages` if you standardize on that later).

**Deploy-ready signal:** GitHub Actions [CI](.github/workflows/ci.yml) runs `npm ci` + `npm run build` on every push/PR to `main`.

**Optional — Vercel CLI** (interactive login; not available in unattended agent sessions):

```bash
npx vercel login
npx vercel          # preview
npx vercel --prod   # production
```

### DNS cutover (when ready — do not change client DNS yet)

1. Keep current Iran WordPress host serving `greendiamondfarm.com` until the Next.js preview is signed off.
2. In the host dashboard, add custom domain `greendiamondfarm.com` (+ `www` if used).
3. At the DNS provider, point apex / `www` to the host’s records (Vercel typically: `A` / `CNAME` as shown in the dashboard).
4. Wait for TLS + propagation; then verify `/`, `/ar`, `/sitemap.xml`, WhatsApp/phone CTAs.
5. Only then retire or redirect the WordPress install.

Prefer a **non-Iran** host so the live site can be used on LinkedIn.

## Products

**In-shell:** Ahmad Aghaei · Akbari · Fandoghi · Kaleh Ghouchi · Dahan Bast  

**Processed:** kernels · salted & roasted

## Client TODOs (go-live)

- Dedicated virtual / business WhatsApp line (site currently uses temporary `+989361814577`)
- Full office address beyond Motahari 52 warehouse
- Confirm export email spelling (`greendiamond` vs `greendimond`)
- Official logo file (site ships a **suggested** diamond + pistachio mark for delivery)
- Owned product / orchard photography; certificates
- Confirm exact experience years (50 / 40 / 30 are provisional in `historyYears`)
- Import repo on Vercel (or peer) and point DNS when signed off
