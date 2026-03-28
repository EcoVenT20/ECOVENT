# دليل ربط النطاق المخصص (www.ecovent-sa.com)

## المشكلة الحالية

النطاق **www.ecovent-sa.com** مسجل على Hostinger ولكنه غير مربوط بموقع ECOVENT على Manus. حالياً يعرض صفحة "Parked Domain" من Hostinger.

## الحل: ربط النطاق بموقع Manus

### الخطوة 1: نشر الموقع على Manus

قبل ربط النطاق المخصص، يجب نشر الموقع أولاً:

1. افتح واجهة إدارة المشروع في Manus
2. اضغط على زر **"Publish"** في الأعلى
3. انتظر حتى يكتمل النشر
4. ستحصل على رابط مؤقت من Manus (مثال: `yourproject.manus.space`)

### الخطوة 2: إعداد النطاق في Manus

1. في واجهة إدارة المشروع، اذهب إلى **Settings → Domains**
2. اضغط على **"Add Custom Domain"** أو **"Bind Custom Domain"**
3. أدخل النطاق: `www.ecovent-sa.com`
4. ستظهر لك معلومات DNS التي تحتاج إضافتها في Hostinger

### الخطوة 3: تكوين DNS في Hostinger

سجّل الدخول إلى حساب Hostinger وقم بالتالي:

#### الطريقة الأولى: استخدام CNAME (موصى بها)

1. اذهب إلى **Domains → DNS / Name Servers**
2. اختر النطاق `ecovent-sa.com`
3. أضف سجل CNAME جديد:
   - **Name/Host:** `www`
   - **Points to/Target:** `[الرابط الذي يوفره Manus]` (مثال: `yourproject.manus.space`)
   - **TTL:** 3600 (أو اتركه افتراضي)

#### الطريقة الثانية: استخدام A Record

إذا لم تنجح CNAME، استخدم A Record:

1. احصل على IP Address من Manus (سيظهر في صفحة Domains)
2. أضف سجل A:
   - **Name/Host:** `www`
   - **Points to:** `[IP Address من Manus]`
   - **TTL:** 3600

#### إضافة Redirect من الجذر (اختياري)

لتوجيه `ecovent-sa.com` (بدون www) إلى `www.ecovent-sa.com`:

1. أضف سجل A للجذر:
   - **Name/Host:** `@` أو اتركه فارغاً
   - **Points to:** نفس IP Address
2. أو استخدم URL Redirect في Hostinger:
   - **From:** `ecovent-sa.com`
   - **To:** `https://www.ecovent-sa.com`
   - **Type:** 301 Permanent

### الخطوة 4: التحقق من الإعدادات

1. بعد حفظ التغييرات في Hostinger، انتظر 5-30 دقيقة لانتشار DNS
2. تحقق من النطاق باستخدام: https://dnschecker.org
3. أدخل `www.ecovent-sa.com` وتحقق من انتشار السجلات

### الخطوة 5: تفعيل SSL (HTTPS)

بعد نجاح ربط النطاق:

1. في Manus، سيتم تفعيل SSL تلقائياً (عادةً)
2. إذا لم يتم تلقائياً، اذهب إلى **Settings → Domains** واضغط على **"Enable SSL"**
3. انتظر 5-15 دقيقة لإصدار الشهادة

## الجدول الزمني المتوقع

- **فوري:** تكوين الإعدادات في Manus و Hostinger
- **5-30 دقيقة:** انتشار DNS عالمياً
- **حتى 48 ساعة:** الانتشار الكامل (نادراً)
- **5-15 دقيقة إضافية:** تفعيل SSL

## استكشاف الأخطاء

### المشكلة: النطاق لا يزال يعرض صفحة Hostinger

**الحل:**
- تأكد من إضافة سجلات DNS بشكل صحيح
- انتظر المزيد من الوقت لانتشار DNS
- امسح ذاكرة التخزين المؤقت للمتصفح (Clear Cache)
- جرب الوصول من متصفح خاص (Incognito/Private)

### المشكلة: خطأ SSL/HTTPS

**الحل:**
- تأكد من أن DNS قد انتشر بالكامل أولاً
- في Manus، اذهب إلى Settings → Domains وأعد تفعيل SSL
- انتظر 15 دقيقة إضافية

### المشكلة: النطاق يعمل أحياناً ولا يعمل أحياناً

**الحل:**
- هذا طبيعي خلال فترة انتشار DNS
- انتظر حتى يكتمل الانتشار (استخدم dnschecker.org للتحقق)

## ملاحظات مهمة

1. **لا تحذف الاستضافة في Hostinger** إذا كنت تستخدمها للبريد الإلكتروني
2. **احتفظ بسجلات MX** إذا كان لديك بريد إلكتروني على النطاق
3. **النطاق الفرعي (subdomain)** يحتاج إعداد منفصل إذا أردت استخدامه
4. **Manus توفر استضافة كاملة** - لا حاجة لاستضافة Hostinger بعد الربط

## الدعم

إذا واجهت مشاكل:
- **دعم Manus:** https://help.manus.im
- **دعم Hostinger:** من خلال حسابك في Hostinger
- **فحص DNS:** https://dnschecker.org
- **فحص SSL:** https://www.ssllabs.com/ssltest/
