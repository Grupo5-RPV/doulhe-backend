import { Decrypter, Encrypter } from 'src/data/protocols/cryptography'
import jwt from 'jsonwebtoken'

export default class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly secret: string
  ) {
    this.secret = secret
  }

  encrypt (text: string): string {
    return jwt.sign({ id: text }, this.secret)
  }

  decrypt (cipher: string): string {
    return jwt.verify(cipher, this.secret) as string
  }
}
