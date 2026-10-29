# باز کردن دموی عمومی روی Netlify (بدون Vercel)

سایت‌های فعلی متصل به این ریپو password دارند و از بیرون **401** می‌دهند. برای تحویل به کارفرما باید عمومی شوند.

## مراحل

1. وارد [Netlify](https://app.netlify.com) شوید (Continue with GitHub در صورت نیاز).
2. یکی از پروژه‌های متصل به `Arafie3480/Pistachio-Company` را باز کنید  
   (مثلاً `hosseininavehcompany` یا `luxury-frangollo-ebabef`).
3. **Site configuration → Access control** (یا Visitor access / Password protection) → **Disable**.
4. مطمئن شوید Production از branch **`main`** است و آخرین deploy Publish شده.
5. در مرورگر ناشناس باز کنید:
   - `https://<site>.netlify.app/`
   - `/products` · `/ar` · `/contact`
6. اگر **200** بود، همان URL را در `docs/demo-message-for-client.md` بگذارید و برای کارفرما بفرستید.

## چک سریع

```bash
curl -sI "https://<site>.netlify.app/en" | head -5
# باید HTTP/2 200 باشد نه 401
```

## اگر Access خاموش نشد

Cloudflare Pages: Connect Git → همان ریپو → Framework Next.js → Deploy → `*.pages.dev`.
