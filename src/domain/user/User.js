class User {
  constructor ({ id, email, passwordHash, refreshTokens = [], createdAt, updatedAt }) {
    this.id = id
    this.email = email
    this.passwordHash = passwordHash
    this.refreshTokens = refreshTokens
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

module.exports = { User }
