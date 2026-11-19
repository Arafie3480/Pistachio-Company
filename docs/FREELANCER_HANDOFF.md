# تحویل کامل سمت فریلنسر — Green Diamond Farm  
تاریخ: ۱۹ نوامبر ۲۰۲۶ (Asia/Tehran)  
وضعیت: **تکمیل فنی go-live**

---

## یک‌خطی

سایت زنده است، قالب قفل است، محتوا از Site Content عوض می‌شود. کار فنی فریلنسر برای این قرارداد (تا go-live دامنه) تمام است.

**زنده:** https://greendiamondfarm.com  
**قالب:** `green-diamond-farm` **v1.0.4**  

---

## بسته اسناد

| سند | کاربرد |
|-----|--------|
| [delivery-receipt.md](./delivery-receipt.md) | رسید تحویل رسمی |
| [client-final-report.md](./client-final-report.md) | **گزارش کامل قابل‌ارسال به کارفرما** |
| [client-message-live.md](./client-message-live.md) | پیام کوتاه تلگرام/ایمیل |
| [wordpress-client-edit-guide.md](./wordpress-client-edit-guide.md) | آموزش کوتاه فقط‌محتوا |
| [conflict-fix-blocksy.md](./conflict-fix-blocksy.md) | رفع تداخل Blocksy/Stackable |
| [freelancer-closeout.md](./freelancer-closeout.md) | چک‌لیست بستن |
| [invoice-demo-approval.md](./invoice-demo-approval.md) | مالی / مرحله ۲ |

کد: PR #4 (cutover) مِرج شده · PR #5 (پایداری + زبان + SEO پایه v1.0.4) آماده merge  

---

## QA نهایی زنده (تأییدشده)

- Home / About / Products / Contact / Privacy  
- `/fa/*` راست‌چین · `/` انگلیسی `ltr`  
- منوی زبان: همه ۷ زبان خوانا · EN ↔ FA روی home و about  
- لوگو از `assets/brand/` (نه لوگوی CREATIVEMINDS)  
- بدون Blocksy / Stackable روی فرانت  
- About: ۳۹+ / ۳۴+ / ۳۰+  
- Contact: ایمیل + واتساپ  
- SEO پایه (قرارداد): `canonical` + Open Graph روی `/` و `/fa/` · نسخه دارایی‌ها `1.0.4`  
- چیپ‌های همیشه روشن **فارسی / العربية / English** در هدر  


---

## کار باقی‌مانده فقط سمت کارفرما

1. تعویض رمز wp-admin  
2. بازبینی نهایی / اصلاح جزئی متن در Site Content  
3. عکس اختصاصی (اختیاری)  
4. پرداخت مرحله ۲ طبق پیش‌فاکتور  
5. Blocksy / Companion / Stackable را دوباره فعال نکند  
6. اگر منوی زبان قدیمی می‌بیند: یک‌بار رفرش سخت / خالی کردن کش  

---

## خارج از این تحویل

- نگهداری ماهانه / پشتیبانی بلندمدت بدون قرارداد جدا  
- صفحه‌ساز آزاد (Elementor و مشابه)  
- بازطراحی گسترده پس از go-live  
