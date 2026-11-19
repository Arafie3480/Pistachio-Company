# بسته دمو / تحویل کارفرما — Green Diamond Farm

وضعیت: دمو روی شاخه تحویل تأییدشده (lint + build + smoke). مسیر عمومی پایدار هدف: **Netlify بدون password**.

**وضعیت‌نامه:** [client-project-status.md](./client-project-status.md)

## دمو لوکال (تیم)

| مورد | مسیر |
|------|------|
| Home EN | `/en` |
| Home FA (RTL) | `/fa` |
| Products | `/en/products` |
| Contact | `/en/contact` |
| پیام آماده | [demo-message-for-client.md](./demo-message-for-client.md) |
| ریپو | https://github.com/Arafie3480/Pistachio-Company |
| دامنه نهایی | greendiamondfarm.com (پس از تأیید + DNS) |

```bash
npm run build && npm run start
# یا: npm run smoke:ci
```

پورت پیش‌فرض: **4321**

## URL عمومی پایدار

Netlify ممکن است هنوز password داشته باشد (401). برای اشتراک با کارفرما:

1. Netlify → پروژهٔ متصل به ریپو  
2. Access control / Password protection را خاموش کنید  
3. Production از `main` را Publish کنید  
4. URL را در پیام دمو قرار دهید  

جزئیات بیشتر: [netlify-public-demo.md](./netlify-public-demo.md)

## هنوز با کارفرما

- عکس اختصاصی محصول / باغ  
- تأیید تماس و آدرس کامل  
- پرداخت مرحله ۲ قبل از cutover دامنه  
