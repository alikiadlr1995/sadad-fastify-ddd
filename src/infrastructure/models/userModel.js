const mongoose = require('mongoose')

const RefreshTokenSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false })

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  refreshTokens: { type: [RefreshTokenSchema], default: [] }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema)
module.exports = { UserModel }
