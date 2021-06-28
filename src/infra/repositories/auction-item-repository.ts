import { getRepository } from 'typeorm'

import { AuctionItem } from '../../domain/entities'
import IAuctionItemRepository from '../../data/protocols/db/auction-item-repository'

export default class AuctionItemRepository implements IAuctionItemRepository {
  async findById (auctionItemId: string): Promise<AuctionItem> {
    return await getRepository(AuctionItem).findOne({ id: auctionItemId })
  }

  async updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem> {
    const auctionItem = await getRepository(AuctionItem).findOne({ id: auctionItemId })
    auctionItem.auctionId = auctionId
    return await getRepository(AuctionItem).save(auctionItem)
  }
}
