# بسته دمو / تحویل کارفرما — Green Diamond Farm

وضعیت: دمو روی `main` تأییدشده (lint + build + smoke CI). مسیر عمومی پایدار: **Netlify بدون password** (Vercel فعلاً استفاده نمی‌شود).

## دمو برای نمایش همین الان (لوکال)

| مورد | لینک |
|------|------|
| **Home EN** | http://127.0.0.1:4321/en |
| **Products** | http://127.0.0.1:4321/en/products |
| **Home AR (RTL)** | http://127.0.0.1:4321/ar |
| **Contact** | http://127.0.0.1:4321/en/contact |
| پیام آماده ارسال | [demo-message-for-client.md](./demo-message-for-client.md) |
| ریپو | https://github.com/Arafie3480/Pistachio-Company (`main`) |
| دامنه نهایی | https://greendiamondfarm.com (بعد از تأیید کارفرما + DNS) |

```powershell
cd $env:USERPROFILE\OneDrive\Desktop\projects\Pistachio-Company
git checkout main
git pull
npm run build
npm run start
# یا: npm run smoke:ci
```

پورت: **4321** · branch: `main` · checkout: `Desktop\projects\Pistachio-Company` (نه radfelez)

## URL عمومی پایدار (بدون Vercel)

Netlify از قبل به ریپو وصل است، ولی **Access / password → HTTP 401** دارد و برای کارفرما قابل‌اشتراک نیست.

1. https://app.netlify.com → پروژهٔ متصل به `Arafie3480/Pistachio-Company`
2. **Site configuration → Access control / Visitor access** → Password protection را خاموش کنید
3. Production deploy از `main` را Publish کنید
4. URL عمومی (مثلاً `https://hosseininavehcompany.netlify.app`) را تست کنید تا بدون لاگین **200** بدهد
5. همان لینک را در [demo-message-for-client.md](./demo-message-for-client.md) جای «لینک عمومی» بگذارید

جایگزین پایدار: Cloudflare Pages → Connect to Git → همان ریپو (نه Workers اد-هاک).

راهنمای قدیمی Vercel (اختیاری، فعلاً رد شده): [vercel-sms-bypass.md](./vercel-sms-bypass.md)

**ممنوع:** Claim/SMS ایران · لینک مولک/خراب Workers یا `*.tmp.now` · Netlify با Access/401 · تونل موقت به‌عنوان دامنهٔ نهایی

## اسکرین‌شات‌های تازه دمو

- `media/demo-home-en.png`
- `media/demo-products-en.png`
- `media/demo-home-ar.png`
- `media/demo-contact-en.png`

## محتوای آماده کارفرما

- برند **Green Diamond Farm** + بازرگانی **حسینی نوه** + لوگوی پیش‌فرض
- مسیر: Home · About · Products · Contact · Privacy
- زبان‌ها: EN · AR (RTL) · TR · ZH · HI · RU
- محصولات: احمدآقایی، اکبری، فندقی، کله‌قوچی، دهن‌بست، مغز، شور و بوداده
- تماس: ایمیل · واتساپ/تلفن · انبار مطهری ۵۲ (ارقام در `src/lib/site.ts` → `contact`)
- SEO / امنیت: sitemap · robots · OG · favicon · security headers · صفحه Privacy

## هنوز از کارفرما (بعد از تأیید دمو)

- تأیید مسیر بصری دمو
- لوگوی نهایی · عکس محصول · گواهی‌ها
- تأیید املای ایمیل · آدرس کامل انبار · شماره اختصاصی
- دامنه یک‌ساله Cloudflare + DNS دامنه

## پیام کوتاه

دموی اولیهٔ سایت آماده نمایش است — چندزبانه، برند، تماس.  
**لوکال:** http://127.0.0.1:4321/en · branch `main`  
**عمومی پایدار:** بعد از خاموش‌کردن password در Netlify → `*.netlify.app`
