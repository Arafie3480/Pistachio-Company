# بسته دمو / تحویل کارفرما — Green Diamond Farm

وضعیت: دموی لوکال تأییدشده و آماده نمایش به کارفرما. URL عمومی پایدار بعد از Import OAuth.

## دمو برای نمایش همین الان (لوکال)

| مورد | لینک |
|------|------|
| **Home EN** | http://127.0.0.1:4321/en |
| **Products** | http://127.0.0.1:4321/en/products |
| **Home AR (RTL)** | http://127.0.0.1:4321/ar |
| **Contact** | http://127.0.0.1:4321/en/contact |
| پیام آماده ارسال | [demo-message-for-client.md](./demo-message-for-client.md) |
| ریپو | https://github.com/Arafie3480/Pistachio-Company (`main` @ `353bdc6`) |
| دامنه نهایی | https://greendiamondfarm.com (بعد از تأیید کارفرما + DNS) |

```powershell
cd $env:USERPROFILE\OneDrive\Desktop\projects\Pistachio-Company
npm run start
# یا: npm run dev
```

پورت: **4321** · tip: `353bdc6` · checkout: `Desktop\projects\Pistachio-Company` (نه radfelez)

## URL عمومی پایدار

بعد از **Vercel → Continue with GitHub → Import `Arafie3480/Pistachio-Company`** لینک `*.vercel.app` را اینجا و در پیام کارفرما بگذار.

راهنما (بدون SMS): [vercel-sms-bypass.md](./vercel-sms-bypass.md)

**ممنوع:** Claim/SMS ایران · لینک مولک/خراب Workers یا `*.tmp.now`

## اسکرین‌شات‌های تازه دمو

- `media/demo-home-en.png`
- `media/demo-products-en.png`
- `media/demo-home-ar.png`
- `media/demo-contact-en.png`

## محتوای آماده کارفرما

- برند **Green Diamond Farm** + بازرگانی **حسینی نوه** + لوگوی پیش‌فرض
- مسیر: Home · About · Products · Contact
- زبان‌ها: EN · AR (RTL) · TR · ZH · HI · RU
- محصولات: احمدآقایی، اکبری، فندقی، کله‌قوچی، دهن‌بست، مغز، شور و بوداده
- تماس: ایمیل · واتساپ/تلفن `+98 936 181 4577` · انبار مطهری ۵۲
- SEO: sitemap · robots · OG · favicon · security headers

## مسیر پایدار عمومی (بدون SMS)

1. https://vercel.com/signup → **Continue with GitHub** (`Arafie3480`)
2. Import **`Arafie3480/Pistachio-Company`** → Next.js → Deploy
3. لینک `*.vercel.app` را در پیام کارفرما جایگزین کن

جایگزین: Netlify / Cloudflare Pages با همان OAuth.

## هنوز از کارفرما (بعد از تأیید دمو)

- تأیید مسیر بصری دمو
- لوگوی نهایی · عکس محصول · گواهی‌ها
- تأیید املای ایمیل · آدرس کامل انبار · شماره اختصاصی
- دامنه یک‌ساله Cloudflare + DNS دامنه

## پیام کوتاه

دموی اولیهٔ سایت آماده نمایش است — چندزبانه، برند، تماس.  
**الان (نمایش لوکال):** http://127.0.0.1:4321/en · tip `353bdc6`  
**عمومی:** بعد از Vercel Import → `*.vercel.app`
