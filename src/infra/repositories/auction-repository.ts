import { getRepository, Repository } from 'typeorm'

import { Auction } from '../../domain/entities'
import ICreateAuctionParams from '../../domain/usecases/auction/create-auction-params'
import IAuctionRepository from '../../data/protocols/db/auction-repository'

export default class AuctionRepository implements IAuctionRepository {
  private repository: Repository<Auction>

  constructor () {
    this.repository = getRepository(Auction)
  }

  async create (createAuctionData: ICreateAuctionParams): Promise<Auction> {
    const auction = this.repository.create({
      id: null,
      start: createAuctionData.start,
      end: createAuctionData.end,
      closed: 0
    })

    return await this.repository.save(auction)
  }
}
