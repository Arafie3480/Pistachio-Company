# رفع تداخل قالب خریداری‌شده (Blocksy) با Green Diamond Farm  
تاریخ: ۱۹ نوامبر ۲۰۲۶ (Asia/Tehran)

## علت

روی هاست هنوز این‌ها از خرید قبلی مانده بود:

| مورد | اثر |
|------|-----|
| افزونه **Blocksy Companion** (فعال) | تزریق اسکریپت/استایل و منطق قالب Blocksy روی فرانت |
| افزونه **Stackable** (فعال) | CSS فرانت + کلاس `stk-*` روی `body` |
| قالب **Blocksy** (نصب‌شده، غیرفعال) | منبع لوگوی Customizer قدیمی |
| **Custom Logo** وردپرس (`logo-dark.svg` / CREATIVEMINDS) | جایگزینی لوگوی رسمی Green Diamond Farm |
| زبان سایت RTL در هسته وردپرس | کلاس `rtl` روی صفحات انگلیسی |

## اقدام انجام‌شده

1. غیرفعال‌سازی Blocksy Companion و Stackable روی زنده  
2. قالب ۱٫۰٫۱: لوگوی برند فقط از `assets/brand/`  
3. `inc/compat.php`: پاک‌سازی logo / RTL / dequeue در صورت روشن شدن دوباره افزونه‌ها  
4. تأیید زنده: لوگو برند، EN=`ltr`، FA=`rtl`، بدون stackable/blocksy در HTML  

## توصیه به کارفرما

- Blocksy را دوباره **فعال نکنید**  
- Blocksy Companion و Stackable را روشن نکنید  
- ویرایش محتوا فقط از **ظاهر → Site Content**  
