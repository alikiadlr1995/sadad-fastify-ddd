# Fastify + Mongo + DDD (احراز هویت)

این پروژه یک اسکلت مینیمال بک‌اند با **Fastify**، **MongoDB** و معماری **DDD** است که
اندپوینت‌های پایه احراز هویت را فراهم می‌کند:

- `POST /auth/register` ثبت‌نام
- `POST /auth/login` ورود
- `POST /auth/logout` خروج (ابطال رفرش‌توکن)
- `POST /auth/refresh` صدور توکن دسترسی جدید
- `GET /auth/me` دریافت پروفایل (نیاز به Access Token)

## راه‌اندازی سریع

1) پیش‌نیازها: Node.js 18+ و MongoDB در حال اجرا
2) نصب پکیج‌ها:
```bash
npm install
```
3) ساخت فایل `.env` بر اساس `.env.example`:
```bash
cp .env.example .env
# سپس مقادیر را اصلاح کنید
```
4) اجرا:
```bash
npm run dev
# یا
npm start
```

## تست سریع با curl

ثبت‌نام:
```bash
curl -X POST http://localhost:3000/auth/register   -H "Content-Type: application/json"   -d '{"email":"user@test.com","password":"P@ssw0rd!"}'
```

ورود:
```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"email":"user@test.com","password":"P@ssw0rd!"}'
```

دریافت پروفایل:
```bash
ACCESS=توکن_دریافتی_از_login_یا_refresh
curl http://localhost:3000/auth/me -H "Authorization: Bearer $ACCESS"
```

خروج (لاگ‌اوت):
```bash
curl -X POST http://localhost:3000/auth/logout   -H "Content-Type: application/json"   -d '{"refreshToken":"REFRESH_TOKEN_از_login_یا_refresh"}'
```

نوسازی توکن دسترسی:
```bash
curl -X POST http://localhost:3000/auth/refresh   -H "Content-Type: application/json"   -d '{"refreshToken":"REFRESH_TOKEN"}'
```

## ساختار پوشه‌ها (DDD سبک)

```
src/
  app.js                 # بوت‌استرپ Fastify
  server.js              # نقطه شروع
  config/
    env.js               # بارگذاری تنظیمات
  infrastructure/
    db/mongo.js          # اتصال مانگوس
    models/userModel.js  # مدل مانگوس
    repositories/MongoUserRepository.js
    security/jwt.js
    security/password.js
  domain/
    user/User.js
    user/UserRepository.js
  application/
    auth/RegisterUser.js
    auth/LoginUser.js
    auth/LogoutUser.js
    auth/RefreshAccessToken.js
  interfaces/http/
    routes/authRoutes.js
    controllers/authController.js
    schemas/authSchemas.js
```

> نکته: برای سادگی، رفرش‌توکن در پایگاه‌داده به صورت **هش** ذخیره می‌شود و
> هنگام لاگ‌اوت حذف می‌گردد. توکن دسترسی عمر کوتاه دارد (پیش‌فرض 15 دقیقه).
