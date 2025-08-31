import { Schema, model } from 'mongoose'

const RefreshTokenSchema = new Schema({
  hash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false })

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  refreshTokens: { type: [RefreshTokenSchema], default: [] }
}, { timestamps: true })

const UserModel = model('User', UserSchema)
export default { UserModel }
