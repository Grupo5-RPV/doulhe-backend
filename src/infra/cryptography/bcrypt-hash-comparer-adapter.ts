import bcrypt from 'bcrypt'
import { HashComparer } from '../../data/protocols/cryptography'

export default class BcryptHashComparerAdapter implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
