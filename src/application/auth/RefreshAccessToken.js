import { hashToken, signAccessToken, signRefreshToken } from '../../infrastructure/security/jwt.js'
import ms from 'ms'
import { REFRESH_TOKEN_EXPIRES } from '../../config/env.js'

export async function RefreshAccessToken({ userRepo, fastify }, { refreshToken }) {
  let payload
  try {
    payload = await fastify.jwt.verify(refreshToken)
    if (payload.type !== 'refresh') throw new Error('Bad token')
  } catch (e) {
    const err = new Error('Invalid refresh token')
    err.statusCode = 400
    throw err
  }

  const userId = payload.sub
  const oldHash = hashToken(refreshToken)

  const valid = await userRepo.hasRefreshToken(userId, oldHash)
  if (!valid) {
    const err = new Error('Refresh token revoked')
    err.statusCode = 401
    throw err
  }

  const user = await userRepo.findById(userId)
  if (!user) {
    const err = new Error('User not found')
    err.statusCode = 404
    throw err
  }

  const accessToken = signAccessToken(fastify, user)

  // Rotate refresh token (best practice)
  const newRefreshToken = signRefreshToken(fastify, user)
  const newHash = hashToken(newRefreshToken)
  const newExpiresAt = new Date(Date.now() + ms(REFRESH_TOKEN_EXPIRES))

  await userRepo.rotateRefreshToken(userId, oldHash, newHash, newExpiresAt)

  return { accessToken, refreshToken: newRefreshToken }
}

export default RefreshAccessToken
