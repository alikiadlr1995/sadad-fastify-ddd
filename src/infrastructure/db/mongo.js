const mongoose = require('mongoose')
const { MONGO_URI } = require('../../config/env')

async function connectMongo (fastify) {
  mongoose.set('strictQuery', true)
  await mongoose.connect(MONGO_URI)
  fastify.log.info('MongoDB connected')
}

module.exports = { connectMongo }
