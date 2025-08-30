# Fastify + Mongo + DDD (Authentication)

This project is a **minimal backend skeleton** built with **Fastify**, **MongoDB**, and a **DDD** architecture that provides basic authentication endpoints:

- `POST /auth/register` Sign up
- `POST /auth/login` Sign in
- `POST /auth/logout` Logout (refresh-token revocation)
- `POST /auth/refresh` Issue a new access token
- `GET /auth/me` Get profile (requires Access Token)

## Quick Start

1) Prerequisites: Node.js 18+ and a running MongoDB
2) Install packages:
```bash
cp .env.example .env
```
3) Create .env from .env.example:
```bash
cp .env.example .env
```
4) Run:
```bash
npm run dev
# or
npm start
```

## Quick cURL Tests

Register:
```bash
curl -X POST http://localhost:3000/auth/register   -H "Content-Type: application/json"   -d '{"email":"user@test.com","password":"P@ssw0rd!"}'

```

Login:
```bash
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{"email":"user@test.com","password":"P@ssw0rd!"}'
```

Get profile:
```bash
ACCESS=token_received_from_login_or_refresh
curl http://localhost:3000/auth/me -H "Authorization: Bearer $ACCESS"
```

Logout:
```bash
curl -X POST http://localhost:3000/auth/logout   -H "Content-Type: application/json"   -d '{"refreshToken":"REFRESH_TOKEN_from_login_or_refresh"}'
```

Refresh access token:
```bash
curl -X POST http://localhost:3000/auth/refresh   -H "Content-Type: application/json"   -d '{"refreshToken":"REFRESH_TOKEN"}'
```

## Folder Structure (DDD-Style)

```
src/
  app.js                 # Fastify bootstrap
  server.js              # Entry point
  config/
    env.js               # Environment loading
  infrastructure/
    db/mongo.js          # Mongoose connection
    models/userModel.js  # Mongoose model
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

Note: For simplicity, the refresh token is stored hashed in the database and removed on logout.
The access token has a short lifetime (default 15 minutes).
