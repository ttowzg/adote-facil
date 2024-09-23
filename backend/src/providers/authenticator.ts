import jwt from 'jsonwebtoken'

export class Authenticator {
  generateToken(payload: object): string {
    const secret = process.env.JWT_SECRET || 'secret'

    return jwt.sign(payload, secret, { expiresIn: '1h' })
  }
}

export const authenticatorInstance = new Authenticator()
