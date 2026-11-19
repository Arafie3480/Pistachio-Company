# نصب فوری روی هاست — بدون منتظر ماندن برای MCP

تاریخ: ۱۹ نوامبر ۲۰۲۶ (Asia/Tehran)

سایت `greendiamondfarm.com` وردپرس **خودمیزبان** است. اتصال WordPress.com لازم نیست.

**وضعیت زنده (۱۹ نوامبر ۲۰۲۶):** قالب فعلی دامنه **Blocksy** است. نصب قالب Green Diamond Farm آن را جایگزین می‌کند (Blocksy حذف نمی‌شود؛ فقط غیرفعال می‌ماند و برگشت‌پذیر است).

---

## روش A — یک فایل نصب‌کننده (پیشنهادی برای الان)

فایل‌ها در ریپو / PR:

- `wordpress/gdf-install.php` — نصب‌کننده یک‌بارمصرف  
- `wordpress/dist/green-diamond-farm.zip` — بسته قالب  

### مراحل (۵ دقیقه)

1. وارد پیشخوان شوید: `https://greendiamondfarm.com/wp-admin`  
2. با File Manager / FTP این دو فایل را در **ریشه وردپرس** (کنار `wp-config.php`) بگذارید:  
   - `gdf-install.php`  
   - `green-diamond-farm.zip`  
3. در همان مرورگری که لاگین هستید باز کنید:  
   `https://greendiamondfarm.com/gdf-install.php`  
4. دکمهٔ «نصب و فعال‌سازی قالب» را بزنید.  
5. **حتماً** `gdf-install.php` و زیپ را از هاست حذف کنید.  
6. تنظیمات → پیوندهای یکتا → ذخیره.  
7. ظاهر → **Site Content** برای متن/تماس.

اگر هاست اجازهٔ دانلود از GitHub داشته باشد، فقط `gdf-install.php` هم کافی است (زیپ را خودش می‌گیرد).

---

## روش B — از پیشخوان وردپرس

1. پوسته‌ها → افزودن → بارگذاری `green-diamond-farm.zip`  
2. فعال‌سازی  
3. پیوندهای یکتا → ذخیره  
4. ظاهر → Site Content  

---

## روش C — برای ایجنت (بعداً)

Secrets محیط:

- `WP_SITE_URL` · `WP_USERNAME` · `WP_APPLICATION_PASSWORD`  
- اختیاری: `SFTP_*`  

سپس:

```bash
npm run wp:install
```

---

## بعد از نصب — چک‌لیست مجری

- [ ] Home / About / Products / Contact / Privacy درست‌اند  
- [ ] فارسی RTL و زبان‌ها در سوئیچر  
- [ ] لوگو بدون حاشیه سفید  
- [ ] About: ۳۹+ / ۳۴+ / ۳۰+  
- [ ] ایمیل و واتساپ کار می‌کنند  
- [ ] Site Content فقط محتوا را عوض می‌کند  
- [ ] فایل نصب‌کننده از سرور پاک شده  

راهنمای کارفرما: [wordpress-client-edit-guide.md](./wordpress-client-edit-guide.md)
