const fp = require('fastify-plugin')
const { MongoUserRepository } = require('../../../infrastructure/repositories/MongoUserRepository')
const { authController } = require('../controllers/authController')
const { registerBody, loginBody, tokenBody } = require('../schemas/authSchemas')

async function routes (fastify) {
  const userRepo = new MongoUserRepository()
  const controller = authController({ userRepo })

  fastify.post('/auth/register', { schema: { body: registerBody } }, controller.register)
  fastify.post('/auth/login', { schema: { body: loginBody } }, controller.login)
  fastify.get('/auth/me', { preHandler: [fastify.authenticate] }, controller.me)
  fastify.post('/auth/logout', { schema: { body: tokenBody } }, controller.logout)
  fastify.post('/auth/refresh', { schema: { body: tokenBody } }, controller.refresh)
}

module.exports = fp(routes)
