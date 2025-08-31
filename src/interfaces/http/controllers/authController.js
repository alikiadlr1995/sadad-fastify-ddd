import { RegisterUser } from '../../../application/auth/RegisterUser.js'
import { LoginUser } from '../../../application/auth/LoginUser.js'
import { LogoutUser } from '../../../application/auth/LogoutUser.js'
import { RefreshAccessToken } from '../../../application/auth/RefreshAccessToken.js'

export function authController({ userRepo }) {
  return {
    register: async (req, reply) => {
      const { email, password } = req.body
      const user = await RegisterUser({ userRepo }, { email, password })
      reply.code(201).send({ id: user.id, email: user.email })
    },

    login: async (req, reply) => {
      const { email, password } = req.body
      const { user, accessToken, refreshToken } =
        await LoginUser({ userRepo, fastify: req.server }, { email, password })
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
    },
  }
}

export default authController
