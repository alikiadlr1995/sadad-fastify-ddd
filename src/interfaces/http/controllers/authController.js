const { RegisterUser } = require('../../../application/auth/RegisterUser')
const { LoginUser } = require('../../../application/auth/LoginUser')
const { LogoutUser } = require('../../../application/auth/LogoutUser')
const { RefreshAccessToken } = require('../../../application/auth/RefreshAccessToken')

function authController ({ userRepo }) {
  return {
    register: async (req, reply) => {
      const { email, password } = req.body
      const user = await RegisterUser({ userRepo }, { email, password })
      reply.code(201).send({ id: user.id, email: user.email })
    },
    login: async (req, reply) => {
      const { email, password } = req.body
      const { user, accessToken, refreshToken } = await LoginUser({ userRepo, fastify: req.server }, { email, password })
      reply.send({ user, accessToken, refreshToken })
    },
    me: async (req, reply) => {
      const user = await userRepo.findById(req.user.sub)
      if (!user) return reply.code(404).send({ message: 'User not found' })
      reply.send({ id: user.id, email: user.email })
    },
    logout: async (req, reply) => {
      const { refreshToken } = req.body
      const out = await LogoutUser({ userRepo, fastify: req.server }, { refreshToken })
      reply.send(out)
    },
    refresh: async (req, reply) => {
      const { refreshToken } = req.body
      const out = await RefreshAccessToken({ userRepo, fastify: req.server }, { refreshToken })
      reply.send(out)
    }
  }
}

module.exports = { authController }
