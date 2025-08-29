const dotenv = require('dotenv')
dotenv.config()

function required(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

module.exports = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGO_URI: required('MONGO_URI'),
  JWT_SECRET: required('JWT_SECRET'),
  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || '15m',
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || '7d',
  JWT_ISSUER: process.env.JWT_ISSUER || 'example.auth',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'example.clients'
}
