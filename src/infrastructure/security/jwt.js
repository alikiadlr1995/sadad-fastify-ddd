const crypto = require('crypto')
const { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES, JWT_ISSUER, JWT_AUDIENCE } = require('../../config/env')

function signAccessToken (fastify, user) {
  const payload = { sub: user.id, email: user.email }
  return fastify.jwt.sign(payload, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE
  })
}

function signRefreshToken (fastify, user) {
  // We create a random token id; jwt will include it implicitly in payload if needed
  const payload = { sub: user.id, type: 'refresh' }
  const token = fastify.jwt.sign(payload, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE
  })
  return token
}

function hashToken (token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

module.exports = { signAccessToken, signRefreshToken, hashToken }
