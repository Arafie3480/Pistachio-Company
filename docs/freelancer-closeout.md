# چک‌لیست بستن کار — سمت فریلنسر  
تاریخ: ۱۹ نوامبر ۲۰۲۶ (Asia/Tehran)

## وضعیت

| مورد | وضعیت |
|------|--------|
| دمو Next تأیید ظاهری | ✅ |
| قالب WP (ظاهر قفل + Site Content) | ✅ در ریپو / PR #4 |
| CI | ✅ |
| دامنه زنده | هنوز **Blocksy** — قالب ما نصب نشده |
| پرداخت مرحله ۲ | در انتظار کارفرما (قبل از cutover نهایی) |

## دانلود مستقیم بسته نصب (شاخه تحویل)

- نصب‌کننده:  
  https://raw.githubusercontent.com/Arafie3480/Pistachio-Company/cursor/wordpress-theme-delivery-3e66/wordpress/gdf-install.php  
- زیپ قالب:  
  https://github.com/Arafie3480/Pistachio-Company/raw/cursor/wordpress-theme-delivery-3e66/wordpress/dist/green-diamond-farm.zip  

راهنما: [wordpress-install-now.md](./wordpress-install-now.md)  
پیام کارفرما: [client-message-install-now.md](./client-message-install-now.md)

## برای اتمام go-live (یکی کافی است)

1. کارفرما/شما دو فایل را در ریشه WP آپلود کنید و `gdf-install.php` را باز کنید، **یا**  
2. Secrets محیط Cursor: `WP_SITE_URL` / `WP_USERNAME` / `WP_APPLICATION_PASSWORD` (یا SFTP)

سپس مجری:

- [ ] فعال‌سازی قالب تأیید شود (دیگر Blocksy نباشد)  
- [ ] پیوندهای یکتا ذخیره  
- [ ] FA / EN / Contact / About اعداد ۳۹+/۳۴+/۳۰+  
- [ ] حذف `gdf-install.php` از سرور  
- [ ] آموزش کوتاه Site Content به کارفرما  
- [ ] مرحله ۲ + بستن قرارداد  

PR: https://github.com/Arafie3480/Pistachio-Company/pull/4
