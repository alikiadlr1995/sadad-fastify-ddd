const { hashToken } = require('../../infrastructure/security/jwt')

async function LogoutUser ({ userRepo, fastify }, { refreshToken }) {
  try {
    const payload = fastify.jwt.verify(refreshToken)
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

module.exports = { LogoutUser }
