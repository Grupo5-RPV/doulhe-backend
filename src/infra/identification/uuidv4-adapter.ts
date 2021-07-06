import { IdGenerator } from '../../data/protocols/identification/id-generator'
import { v4 as uuidv4 } from 'uuid'

export default class UUIDv4Adapter implements IdGenerator {
  createUUID (): string {
    return uuidv4()
  }
}
