import { set, connect } from 'mongoose'
import { MONGO_URI } from '../../config/env.js'

export default async function connectMongo (fastify) {
  set('strictQuery', true)
  await connect(MONGO_URI)
  fastify.log.info('MongoDB connected')
}
