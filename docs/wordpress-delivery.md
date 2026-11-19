# تحویل وردپرس — Green Diamond Farm  
تاریخ: ۱۹ نوامبر ۲۰۲۶ (Asia/Tehran)

قالب اختصاصی داخل ریپو: `wordpress/green-diamond-farm/`  
ظاهر قفل است؛ محتوا از **ظاهر ← Site Content** ویرایش می‌شود (بدون Elementor).

---

## آنچه آماده است (سمت مجری)

| مورد | وضعیت |
|------|--------|
| قالب هم‌ظاهر با دموی تأییدشده | آماده در ریپو |
| ۷ زبان (EN/FA/AR/TR/ZH/HI/RU) + RTL | پیش‌فرض از `data/defaults/*.json` |
| ویرایش متن / محصول / تماس / عکس (URL) | Appearance → Site Content |
| صفحات Home · About · Products · Contact · Privacy | با فعال‌سازی قالب ساخته می‌شوند |
| بدون صفحه‌ساز آزاد | عمدی |

---

## نصب روی وردپرس کارفرما

**نصب فوری (پیشنهادی):** [wordpress-install-now.md](./wordpress-install-now.md) — فایل `wordpress/gdf-install.php` + زیپ `wordpress/dist/green-diamond-farm.zip`.

1. لاگین پیشخوان دامنه (رمز در گیت ذخیره نشود).  
2. روش A (نصب‌کننده) یا بارگذاری زیپ از پوسته‌ها.  
3. تنظیمات → پیوندهای یکتا → «نام نوشته» → ذخیره.  
4. Appearance → Site Content: زبان پیش‌فرض، تماس، در صورت نیاز متن‌ها.  
5. بعد از تأیید + مرحله ۲، cutover نهایی روی `greendiamondfarm.com` (اگر روی استیجینگ بود).

---

## کارفرما چه چیزی را عوض می‌کند؟

راهنمای کوتاه: [wordpress-client-edit-guide.md](./wordpress-client-edit-guide.md)

| قابل ویرایش | قفل |
|-------------|-----|
| متون همه زبان‌ها | رنگ، فونت، فاصله، چیدمان |
| نام/توضیح محصولات | ساختار بخش‌ها |
| ایمیل، تلفن، واتساپ، آدرس | هدر/فوتر از نظر ظاهری |
| URL تصاویر هیرو/محصول | اندازه قاب‌ها |

---

## پیش‌نیاز cutover

- پرداخت مرحله ۲ (طبق پیش‌فاکتور)  
- دسترسی WP  
- تأیید نهایی روی استیجینگ  
- عکس اختصاصی (اختیاری ولی بهتر)

پیام کارفرما: [client-message-visual-ok-wordpress.md](./client-message-visual-ok-wordpress.md)
