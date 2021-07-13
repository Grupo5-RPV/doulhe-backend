import { Auction } from '../../../domain/entities'
import ICreateAuctionParams from '../../../domain/usecases/auction/create-auction-params'
import { getRepository } from 'typeorm'
import IAuctionRepository from '../../../data/protocols/db/auction-repository'

export default class AuctionRepository implements IAuctionRepository {
  findById (id: string): Promise<Auction> {
    return getRepository(Auction).findOne(id)
  }

  findAll (): Promise<Auction[]> {
    return getRepository(Auction).find()
  }

  create (createAuctionData: ICreateAuctionParams): Promise<Auction> {
    const auction = getRepository(Auction).create({
      id: createAuctionData.id,
      start: createAuctionData.start,
      end: createAuctionData.end || null,
      auctioneerId: createAuctionData.auctioneerId,
      closed: 0
    })

    return getRepository(Auction).save(auction)
  }
}
