# Green Diamond Farm

Export website for **بازرگانی حسینی نوه** (Hosseini Naveh) — pistachio export brand **Green Diamond Farm**.

- **Domain:** [greendiamondfarm.com](https://greendiamondfarm.com)
- **GitHub:** [Arafie3480/Pistachio-Company](https://github.com/Arafie3480/Pistachio-Company)
- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · next-intl · shadcn/ui

## Goals

- Clean, simple, chic B2B site (not flashy)
- Locales: English (default), Arabic (RTL), Turkish, Chinese, Hindi, Russian
- Pages: Home, About, Products, Contact
- Contact: export email, WhatsApp placeholder, Motahari 52
- SEO: per-locale meta, `hreflang` alternates, Open Graph, `sitemap.xml`, `robots.txt`

## Local setup

```bash
git clone https://github.com/Arafie3480/Pistachio-Company.git
cd Pistachio-Company
npm install
npm run dev
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

Locale paths: `/` (EN), `/ar`, `/tr`, `/zh`, `/hi`, `/ru` — plus `/about`, `/products`, `/contact` under each.

```bash
npm run build   # production build
npm start       # serve build on :4321
```

SEO check after build/start: `/sitemap.xml`, `/robots.txt`.

## Deploy (Vercel)

One-command preview (requires [Vercel CLI](https://vercel.com/docs/cli) login):

```bash
npx vercel
```

Production:

```bash
npx vercel --prod
```

Or connect the GitHub repo in the [Vercel dashboard](https://vercel.com/new) → import `Arafie3480/Pistachio-Company` → Framework: Next.js → Deploy. No env vars required for the static marketing site.

DNS / custom domain (`greendiamondfarm.com`) is out of scope until cutover from WordPress.

## Products

Ahmad Aghaei · Akbari · Fandoghi · Kaleh Ghouchi · Dahan Bast · kernels · salted & roasted

## Client TODOs

- WhatsApp business number
- Full office address (beyond Motahari 52)
- Confirm export email spelling (`greendiamond` vs `greendimond`)
- Logo, product photos, certificates (favicon/OG currently use a green-diamond placeholder)
- Final company history facts for About
