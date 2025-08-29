const { verifyPassword } = require('../../infrastructure/security/password')
const { signAccessToken, signRefreshToken, hashToken } = require('../../infrastructure/security/jwt')
const ms = require('ms')
const { REFRESH_TOKEN_EXPIRES } = require('../../config/env')

async function LoginUser ({ userRepo, fastify }, { email, password }) {
  const user = await userRepo.findByEmail(email)
  if (!user) {
    const err = new Error('Invalid credentials')
    err.statusCode = 401
    throw err
  }
  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) {
    const err = new Error('Invalid credentials')
    err.statusCode = 401
    throw err
  }
  const accessToken = signAccessToken(fastify, user)
  const refreshToken = signRefreshToken(fastify, user)
  const hash = hashToken(refreshToken)
  const expiresAt = new Date(Date.now() + ms(REFRESH_TOKEN_EXPIRES))
  await userRepo.addRefreshToken(user.id, { hash, expiresAt })
  return { user: { id: user.id, email: user.email }, accessToken, refreshToken }
}

module.exports = { LoginUser }
