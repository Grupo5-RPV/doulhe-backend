import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptography'

export default class BcryptHasherAdapter implements Hasher {
  constructor (private readonly salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
