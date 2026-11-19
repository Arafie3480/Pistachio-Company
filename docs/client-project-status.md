# وضعیت پروژه — Green Diamond Farm  
**بازرگانی حسینی نوه / Hosseini Naveh**  
تاریخ وضعیت: ۱۹ نوامبر ۲۰۲۶ (Asia/Tehran) · ظاهر دمو توسط کارفرما تأیید شد

---

## خلاصه یک‌خطی

**تحویل فنی کامل.** سایت زنده روی https://greendiamondfarm.com (قالب v1.0.5). فهرست تحویل: [FREELANCER_HANDOFF.md](./FREELANCER_HANDOFF.md) · رسید: [delivery-receipt.md](./delivery-receipt.md) · پیام: [client-message-live.md](./client-message-live.md).

---

## آنچه آماده است (قابل نمایش)

| بخش | وضعیت |
|------|--------|
| صفحات Home · About · Products · Contact · Privacy | آماده |
| زبان‌ها EN · **FA (راست‌چین)** · AR (راست‌چین) · TR · ZH · HI · RU | آماده (۱۳۹ کلید × ۷ فایل هم‌تراز) |
| لوگوی رسمی Green Diamond Farm Rafsanjan | یکپارچه در هدر/هیرو/فوتر |
| پالت سبز جنگلی + طلایی + CTA طلایی | پولیش‌شده طبق بازخورد |
| About — اعتبار **۳۹+ کشاورزی · ۳۴+ تجارت · ۳۰+ صادرات** (از ۱۳۶۶/۱۳۷۱/۱۳۷۵) | آماده |
| تأیید ظاهری کارفرما | **گرفته شد** |
| نام حقوقی فارسی در هیرو/فوتر برای FA/AR | آماده |
| کاتالوگ: احمدآقایی، اکبری، فندقی، کله‌قوچی، دهن‌بست، مغز، شور و بوداده | آماده |
| تماس: ایمیل · تلفن/واتساپ · انبار مطهری ۵۲ | آماده |
| SEO / امنیت / a11y پایه | آماده |
| تست: `build` + `smoke` ۲۴/۲۴ + `validate:wp` + CI Install/build | سبز |
| قالب وردپرس (استایل قفل + Site Content) | آماده در `wordpress/green-diamond-farm/` |
| پیش‌فاکتور ۱۰M تومان · مرحله ۱ (۵۰٪) دریافت شد | `invoice-demo-approval.md` |

### مسیرهای پیشنهادی برای بازبینی کارفرما

1. صفحه اول — لوگوی رسمی و حس صادراتی  
2. Products — ارقام و برنامه‌های مغز/شور  
3. زبان → **فارسی** یا العربية (راست‌چین)  
4. Contact — ایمیل و واتساپ  
5. About — ارقام سابقه و اعتبار خانواده  

اسکرین‌شات: `media/demo-home-en.png` · `demo-home-fa.png` · `demo-about-en.png` · `demo-products-en.png` · `demo-contact-en.png` · `demo-home-ar.png`  
پیام آماده: [demo-message-for-client.md](./demo-message-for-client.md)  
پیش‌فاکتور: [invoice-demo-approval.md](./invoice-demo-approval.md)

---

## نحوهٔ مشاهده

| روش | اقدام | ماندگاری |
|------|--------|----------|
| لوکال (تیم) | `npm run build && npm run start` → `http://127.0.0.1:4321/en` | پایدار برای تیم |
| تونل موقت | Cloudflare quick tunnel روی `:4321` (فقط جلسهٔ نمایش) | کوتاه‌عمر |
| عمومی پایدار | خاموش‌کردن password نتلی‌فای → `*.netlify.app` | هدف برای کارفرما |
| دامنه نهایی | `greendiamondfarm.com` پس از تأیید + DNS | هنوز WordPress |

راهنما: [netlify-public-demo.md](./netlify-public-demo.md)

---

## مالی (خلاصه)

| مرحله | مبلغ (تومان) | وضعیت |
|------|----------------|--------|
| کل | ۱۰٬۰۰۰٬۰۰۰ | توافق‌شده |
| مرحله ۱ | ۵٬۰۰۰٬۰۰۰ | **دریافت شد** |
| مرحله ۲ (قبل از cutover دامنه) | ۵٬۰۰۰٬۰۰۰ | در انتظار |

---

## در انتظار کارفرما / تصمیم

| مورد | چرا مهم است |
|------|-------------|
| ~~تأیید مسیر بصری دمو~~ | **تأیید شد** — قفل طراحی |
| ~~پرداخت ۵۰٪ مرحله ۱~~ | دریافت شد |
| ~~لوگوی رسمی~~ | روی سایت |
| ~~تاریخچه شرکت (متن کارفرما)~~ | در About نشسته |
| عکس محصول / باغ / انبار اختصاصی | حذف stock |
| باز کردن Netlify بدون password | لینک پایدار موقت |
| پرداخت مرحله ۲ | شرط go-live / دامنه |
| ~~ساخت قالب وردپرس (ظاهر قفل + ویرایش فقط محتوا)~~ | **آماده در ریپو** |
| نصب قالب روی دامنه | ✅ **انجام شد** — `greendiamondfarm.com` روی Green Diamond Farm (دیگر Blocksy نیست) · [freelancer-closeout.md](./freelancer-closeout.md) |
| پرداخت مرحله ۲ | شرط cutover دامنه |
| دسترسی ادمین وردپرس | کارفرما (خصوصی) |

---

## خارج از محدوده بدون توافق جدید

- بازطراحی گسترده پس از go-live  
- صفحه‌ساز آزاد که استایل را هم باز کند  
- نگهداری بلندمدت جدا بدون قرارداد پشتیبانی  

برنامه تحویل وردپرس: [scope-and-wordpress-proposal.md](./scope-and-wordpress-proposal.md)  
پیام آماده: [client-message-visual-ok-wordpress.md](./client-message-visual-ok-wordpress.md)

---

## مخزن و کیفیت

- GitHub: https://github.com/Arafie3480/Pistachio-Company (public)  
- PR تحویل: https://github.com/Arafie3480/Pistachio-Company/pull/3  
- تنظیمات تماس: `src/lib/site.ts` · کپی UI: `messages/*.json`  
- تأیید فنی: `npm run lint` · `npm run build` · `npm run smoke` / `smoke:ci`

---

## گام بعدی

1. خاموش‌کردن password نتلی‌فای و گذاشتن URL در پیام دمو.  
2. نمایش دمو به کارفرما (۵ مسیر بالا — به‌ویژه `/fa` و About).  
3. جمع‌آوری عکس اختصاصی و تأیید تماس.  
4. پس از پرداخت مرحله ۲ (۵M باقیمانده): دامنه + DNS.
