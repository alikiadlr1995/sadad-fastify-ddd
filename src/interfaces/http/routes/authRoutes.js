import fp from 'fastify-plugin'
import  MongoUserRepository  from '../../../infrastructure/repositories/MongoUserRepository.js'
import { authController } from '../controllers/authController.js'
import { registerBody, loginBody, tokenBody } from '../schemas/authSchemas.js'

async function routes(fastify) {
  const userRepo = new MongoUserRepository()
  const controller = authController({ userRepo })

  fastify.post('/auth/register', { schema: { body: registerBody } }, controller.register)
  fastify.post('/auth/login', { schema: { body: loginBody } }, controller.login)
  fastify.get('/auth/me', { preHandler: [fastify.authenticate] }, controller.me)
  fastify.post('/auth/logout', { schema: { body: tokenBody } }, controller.logout)
  fastify.post('/auth/refresh', { schema: { body: tokenBody } }, controller.refresh)
}

export default fp(routes)
export { routes }
