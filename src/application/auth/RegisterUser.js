import { hashPassword } from '../../infrastructure/security/password.js'

export async function RegisterUser({ userRepo }, { email, password }) {
  const existing = await userRepo.findByEmail(email)
  if (existing) {
    const err = new Error('Email already in use')
    err.statusCode = 400
    throw err
  }

  const passwordHash = await hashPassword(password)
  const user = await userRepo.create({ email, passwordHash })
  return user
}

export default RegisterUser
