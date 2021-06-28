import { Auction } from '../../domain/entities'
import ICreateAuctionParams from '../../domain/usecases/auction/create-auction-params'
import IAuctionRepository from '../../data/protocols/db/auction-repository'
import { getRepository } from 'typeorm'

export default class AuctionRepository implements IAuctionRepository {
  async create (createAuctionData: ICreateAuctionParams): Promise<Auction> {
    const auction = getRepository(Auction).create({
      id: null,
      start: createAuctionData.start,
      end: createAuctionData.end,
      closed: 0
    })

    return await getRepository(Auction).save(auction)
  }
}
