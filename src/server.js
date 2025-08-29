const { PORT } = require('./config/env')
const { buildApp } = require('./app')

async function start () {
  const app = buildApp()
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
