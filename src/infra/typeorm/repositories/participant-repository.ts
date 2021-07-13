import { Participant } from '../../../domain/entities'
import { getRepository } from 'typeorm'

import { UserRepository } from '../../../data/protocols/db'

import createParticipantParams from '../../../domain/usecases/participant/create-participant-params'

export default class ParticipantRepository implements UserRepository<Participant> {
  async create (participantData: createParticipantParams): Promise<Participant> {
    const participant = getRepository(Participant).create({
      id: participantData.id,
      name: participantData.name,
      username: participantData.username,
      password: participantData.password,
      email: participantData.email,
      address: participantData.address,
      phone: participantData.phone,
      auctionBids: [],
      auctionSales: [],
      token: participantData.token
    })
    return await getRepository(Participant).save(participant)
  }

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
