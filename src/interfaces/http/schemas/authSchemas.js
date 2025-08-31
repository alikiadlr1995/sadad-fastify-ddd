const email = { type: 'string', format: 'email' }
const password = { type: 'string', minLength: 6, maxLength: 100 }

export const registerBody = {
  type: 'object',
  required: ['email', 'password'],
  properties: { email, password },
}

export const loginBody = registerBody

export const tokenBody = {
  type: 'object',
  required: ['refreshToken'],
  properties: { refreshToken: { type: 'string', minLength: 20 } },
}

export default { registerBody, loginBody, tokenBody }
