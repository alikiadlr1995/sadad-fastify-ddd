import { PORT } from './config/env.js'
import { buildApp } from './app.js' // اگر قبلاً export default داری، می‌تونی: import buildApp from './app.js'

async function start() {
  const app = buildApp()
  try {
    await app.listen({ port: Number(PORT) || 3000, host: '0.0.0.0' })
    app.log.info('Server started')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()