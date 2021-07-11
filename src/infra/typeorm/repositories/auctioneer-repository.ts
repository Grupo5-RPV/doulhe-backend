import { getRepository } from 'typeorm'

import { Auctioneer } from '../../../domain/entities'
import { UserRepository } from '../../../data/protocols/db'

export default class AuctioneerRepository implements UserRepository<Auctioneer> {
  async updateToken (token: string, id: string): Promise<void> {
    const auctioneer = await getRepository(Auctioneer).findOne({ id: id })
    auctioneer.token = token
    await getRepository(Auctioneer).save(auctioneer)
  }

  async findByEmail (email: string): Promise<Auctioneer> {
    return await getRepository(Auctioneer).findOne({ email: email })
  }

  async findByToken (token: string): Promise<Auctioneer> {
    return await getRepository(Auctioneer).findOne({ token: token })
  }

  async findById (id: string): Promise<Auctioneer> {
    return await getRepository(Auctioneer).findOne({ id: id })
  }
}
