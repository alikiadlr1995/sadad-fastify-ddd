const email = { type: 'string', format: 'email' }
const password = { type: 'string', minLength: 6, maxLength: 100 }

const registerBody = {
  type: 'object',
  required: ['email', 'password'],
  properties: { email, password }
}

const loginBody = registerBody

const tokenBody = {
  type: 'object',
  required: ['refreshToken'],
  properties: { refreshToken: { type: 'string', minLength: 20 } }
}

module.exports = { registerBody, loginBody, tokenBody }
