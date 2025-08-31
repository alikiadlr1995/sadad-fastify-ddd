import { verifyPassword } from '../../infrastructure/security/password.js'
import { signAccessToken, signRefreshToken, hashToken } from '../../infrastructure/security/jwt.js'
import ms from 'ms'
import { REFRESH_TOKEN_EXPIRES } from '../../config/env.js'

export async function LoginUser({ userRepo, fastify }, { email, password }) {
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

export default LoginUser
