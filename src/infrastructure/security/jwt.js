import crypto from 'node:crypto'
import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
  JWT_ISSUER,
  JWT_AUDIENCE
} from '../../config/env.js'

export function signAccessToken(fastify, user) {
  const payload = { sub: user.id, email: user.email }
  return fastify.jwt.sign(payload, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE
  })
}

export function signRefreshToken(fastify, user) {
  // refresh token with a distinct type flag
  const payload = { sub: user.id, type: 'refresh' }
  return fastify.jwt.sign(payload, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE
  })
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export default { signAccessToken, signRefreshToken, hashToken }
