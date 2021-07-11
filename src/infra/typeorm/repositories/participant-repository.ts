import { getRepository } from 'typeorm'

import { Participant } from '../../../domain/entities'
import { UserRepository } from '../../../data/protocols/db'

export default class ParticipantRepository implements UserRepository<Participant> {
  async updateToken (token: string, id: string): Promise<void> {
    const auctioneer = await getRepository(Participant).findOne({ id: id })
    auctioneer.token = token
    await getRepository(Participant).save(auctioneer)
  }

  async findByEmail (email: string): Promise<Participant> {
    return await getRepository(Participant).findOne({ email: email })
  }

  async findByToken (token: string): Promise<Participant> {
    return await getRepository(Participant).findOne({ token: token })
  }

  async findById (id: string): Promise<Participant> {
    return await getRepository(Participant).findOne({ id: id })
  }
}
