// Interface-like documentation for the repository methods
/**
 * findByEmail(email) => Promise<User|null>
 * findById(id) => Promise<User|null>
 * create(userProps) => Promise<User>
 * addRefreshToken(userId, { hash, expiresAt }) => Promise<void>
 * removeRefreshToken(userId, hash) => Promise<void>
 */
class UserRepository {}

export default { UserRepository }
