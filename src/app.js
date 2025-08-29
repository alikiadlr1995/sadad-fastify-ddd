const fastify = require('fastify')
const sensible = require('@fastify/sensible')
const jwt = require('@fastify/jwt')
const { JWT_SECRET, JWT_AUDIENCE, JWT_ISSUER } = require('./config/env')
const { connectMongo } = require('./infrastructure/db/mongo')
const authRoutes = require('./interfaces/http/routes/authRoutes')

function buildApp () {
  const app = fastify({ logger: true })

  // Plugins
  app.register(sensible)
  app.register(jwt, {
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

  // Health check
  app.get('/health', async () => ({ ok: true }))

  return app
}

module.exports = { buildApp }
