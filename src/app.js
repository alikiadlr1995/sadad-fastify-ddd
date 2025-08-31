import fastify from 'fastify'
import sensible from '@fastify/sensible'
import fastifyJwt from '@fastify/jwt'
import { JWT_SECRET, JWT_AUDIENCE, JWT_ISSUER } from './config/env.js'
import  connectMongo  from './infrastructure/db/mongo.js'
import authRoutes from './interfaces/http/routes/authRoutes.js'
import charityRoutes from './interfaces/http/routes/charityRoutes.js';


export function buildApp() {
  const app = fastify({ logger: true })

  // Plugins
  app.register(sensible)
  app.register(fastifyJwt, {
    secret: JWT_SECRET,
    sign: { issuer: JWT_ISSUER, audience: JWT_AUDIENCE },
    verify: { issuer: JWT_ISSUER, audience: JWT_AUDIENCE }
  })

  // Decorators
  app.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  // DB
  app.addHook('onReady', async function () {
    await connectMongo(app)
  })

  // Routes
  app.register(authRoutes)
  app.register(charityRoutes)

  // Health check
  app.get('/health', async () => ({ ok: true }))

  return app
}

export default buildApp