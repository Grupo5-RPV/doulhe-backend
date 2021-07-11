import { Participant } from '../../../domain/entities'
import createParticipantParams from '../../../domain/usecases/participant/create-participant-params'
import { getRepository } from 'typeorm'
import IParticipantRepository from '../../../data/protocols/db/participant-repository'

export default class ParticipantRepository implements IParticipantRepository {
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
    return getRepository(Participant).save(participant)
  }

  async findByEmail (email: string): Promise<Participant> {
    return getRepository(Participant).findOne({ email: email })
  }
}
