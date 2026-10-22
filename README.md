# Green Diamond Farm

Export website for **بازرگانی حسینی نوه** (Hosseini Naveh) — pistachio export brand **Green Diamond Farm**.

- **Domain:** [greendiamondfarm.com](https://greendiamondfarm.com)
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

Social cards use the first-party `/opengraph-image` route (not a third-party CDN URL).

## Tunable company facts

Edit `src/lib/site.ts`:

- `historyYears` — provisional agriculture / trade / export years
- `people` — founder & CEO names
- `contact` — email, phone, WhatsApp URL, warehouse line (do not paste phone digits into README or issues)

UI copy lives in `messages/*.json` (next-intl).

## Deploy

**Primary path (recommended):** import this GitHub repo in a host dashboard — no CLI login required.

1. Open [Vercel → New Project](https://vercel.com/new) (or Netlify / Cloudflare Pages with Next.js support).
2. Import **`Arafie3480/Pistachio-Company`** from GitHub.
3. Framework: **Next.js**. Root directory: repo root. **No env vars** required for this marketing site.
4. Deploy. Later pushes to `main` redeploy automatically when the project stays linked.

**Deploy-ready signal:** GitHub Actions [CI](.github/workflows/ci.yml) runs `npm ci` + `npm run build` on every push/PR to `main`. Green CI means the tree is buildable for host import.

**Optional — Vercel CLI** (needs interactive login; not used in agent sessions):

```bash
npx vercel login
npx vercel          # preview
npx vercel --prod   # production
```

There is **no public preview URL** from this repo alone until someone imports it (or completes CLI auth) on a host account.

DNS / custom domain (`greendiamondfarm.com`) is out of scope until cutover from WordPress. Prefer a **non-Iran** host for LinkedIn eligibility.

## Products

**In-shell:** Ahmad Aghaei · Akbari · Fandoghi · Kaleh Ghouchi · Dahan Bast  

**Processed:** kernels · salted & roasted

## Client TODOs (go-live)

- Dedicated virtual / business WhatsApp line (replace the provisional number in `src/lib/site.ts` → `contact`)
- Full office address beyond Motahari 52 warehouse
- Confirm export email spelling (`greendiamond` vs `greendimond`)
- Logo, product photos, certificates (favicon/OG use a green-diamond placeholder)
- Confirm exact experience years (50 / 40 / 30 are provisional in `historyYears`)
