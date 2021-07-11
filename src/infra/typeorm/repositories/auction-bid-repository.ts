import { getRepository } from 'typeorm'

import { AuctionBid } from '../../../domain/entities'
import IAuctioBidRepository from '../../../data/protocols/db/auction-bid-repository'
import auctionBidParams from 'src/domain/usecases/auction-bid/auction-bid-params'

export default class AuctionBidRepository implements IAuctioBidRepository {
  async newBid (auctionBidData: auctionBidParams): Promise<AuctionBid> {
    const bid = getRepository(AuctionBid).create({
      id: auctionBidData.id,
      timestamp: auctionBidData.timestamp,
      value: auctionBidData.value,
      auctionItemId: auctionBidData.auctionItemId,
      participantId: auctionBidData.participantId
    })

    return getRepository(AuctionBid).save(bid)
  }

  async highestBid (auctionItemId: string): Promise<AuctionBid> {
    return getRepository(AuctionBid).findOne({ where: { auctionItemId }, order: { value: 'DESC' } })
  }
}
