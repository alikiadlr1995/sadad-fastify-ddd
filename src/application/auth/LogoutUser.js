import { hashToken } from '../../infrastructure/security/jwt.js'

export async function LogoutUser({ userRepo, fastify }, { refreshToken }) {
  try {
    const payload = await fastify.jwt.verify(refreshToken)
    if (payload.type !== 'refresh') throw new Error('Bad token')

    const hash = hashToken(refreshToken)
    await userRepo.removeRefreshToken(payload.sub, hash)

    return { success: true }
  } catch (e) {
    const err = new Error('Invalid refresh token')
    err.statusCode = 400
    throw err
  }
}

export default LogoutUser
