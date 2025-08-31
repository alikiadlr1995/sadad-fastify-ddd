import 'dotenv/config'

function required(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

export const PORT = Number.parseInt(process.env.PORT ?? '3000', 10)
export const MONGO_URI = required('MONGO_URI')
export const JWT_SECRET = required('JWT_SECRET')
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES ?? '15m'
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES ?? '7d'
export const JWT_ISSUER = process.env.JWT_ISSUER ?? 'example.auth'
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE ?? 'example.clients'

