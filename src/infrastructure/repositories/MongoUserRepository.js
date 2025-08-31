import  UserModel  from '../models/userModel.js'
import  User  from '../../domain/user/User.js'

function toEntity(doc) {
  if (!doc) return null
  const o = doc.toObject({ getters: false, virtuals: false })
  return new User({
    id: o._id.toString(),
    email: o.email,
    passwordHash: o.passwordHash,
    refreshTokens: o.refreshTokens,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt
  })
}

class MongoUserRepository {
  async findByEmail (email) {
    const doc = await UserModel.findOne({ email })
    return toEntity(doc)
  }
  async findById (id) {
    const doc = await UserModel.findById(id)
    return toEntity(doc)
  }
  async create ({ email, passwordHash }) {
    const doc = await UserModel.create({ email, passwordHash })
    return toEntity(doc)
  }
  async addRefreshToken (userId, { hash, expiresAt }) {
    await UserModel.updateOne(
      { _id: userId },
      { $push: { refreshTokens: { hash, expiresAt } } }
    )
  }
  async removeRefreshToken (userId, hash) {
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { refreshTokens: { hash } } }
    )
  }
  async hasRefreshToken (userId, hash) {
    const doc = await UserModel.findOne({ _id: userId, 'refreshTokens.hash': hash })
    return !!doc
  }
  async rotateRefreshToken (userId, oldHash, newHash, newExpiresAt) {
    await UserModel.updateOne(
      { _id: userId },
      {
        $pull: { refreshTokens: { hash: oldHash } },
        $push: { refreshTokens: { hash: newHash, expiresAt: newExpiresAt } }
      }
    )
  }
}

export default class { MongoUserRepository }
