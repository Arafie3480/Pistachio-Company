# دور زدن SMS وریفای Vercel — مسیر پایدار دمو

Claim موقت (`*.tmp.now`) و فلو claim با شماره ایران **SMS نمی‌گیرد**. از claim-SMS استفاده نکنید. لینک موقت/خراب Workers را به کارفرما ندهید.

## مسیر اصلی (بدون SMS): Import از GitHub با OAuth

### A) Vercel — Continue with GitHub
1. با VPN (در صورت نیاز) بروید به https://vercel.com/signup  
2. **Continue with GitHub** بزنید و اکانت `Arafie3480` را وصل کنید (بدون شماره تلفن)  
3. **Add New Project** → Import ریپو **`Arafie3480/Pistachio-Company`**  
4. Framework: Next.js → Deploy  
5. URL پایدار: `https://<project>.vercel.app` — برای LinkedIn و کارفرما همین را بفرستید  

### B) Netlify (جایگزین، معمولاً بدون SMS)
1. https://app.netlify.com/signup → Continue with GitHub  
2. Import `Arafie3480/Pistachio-Company`  
3. Framework: Next.js (پیشنهاد خودکار Netlify) → Deploy  
4. URL: `https://<name>.netlify.app`

### C) Cloudflare Pages (نه Workers اد-هاک)
1. https://dash.cloudflare.com → Workers & Pages → Create → **Connect to Git**  
2. ریپو `Pistachio-Company` · Framework preset: Next.js  
3. URL: `https://<name>.pages.dev`

## Fallback فوری (همین الان کار می‌کند)

```powershell
cd $env:USERPROFILE\OneDrive\Desktop\projects\Pistachio-Company
npm run dev
```

دمو لوکال: **http://127.0.0.1:4321**

- Home EN: http://127.0.0.1:4321/en
- Products: http://127.0.0.1:4321/en/products
- Home AR (RTL): http://127.0.0.1:4321/ar
- Contact: http://127.0.0.1:4321/en/contact

Tip: `cursor/security-harden-handoff-91c0`

## Clone / remote

```bash
git clone https://github.com/Arafie3480/Pistachio-Company.git
# or in an existing clone:
git remote set-url origin https://github.com/Arafie3480/Pistachio-Company.git
```

SSH: `git@github.com:Arafie3480/Pistachio-Company.git`

## وضعیت فعلی

| مورد | وضعیت |
|------|--------|
| Delivery branch | `cursor/security-harden-handoff-91c0` همگام |
| دمو نمایشی | لوکال `:4321` (اسکرین‌شات‌ها در `media/demo-*.png`) |
| Vercel CLI / Claim SMS | ایران بلاک — از Import OAuth استفاده کنید |
| URL عمومی پایدار | بعد از Import OAuth بالا → `*.vercel.app` |

## ممنوع
- Claim لینک موقت + SMS ایران  
- اشتراک لینک خراب Workers / `*.tmp.now` با کارفرما  
- تکیه به preview کوتاه‌عمر برای LinkedIn
