import jwt from 'jsonwebtoken'
import Cipher from '../../data/protocols/cryptography/cipher'

export default class JwtAdapter implements Cipher {
  constructor (private readonly secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
