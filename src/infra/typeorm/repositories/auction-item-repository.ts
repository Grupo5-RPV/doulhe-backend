import { getRepository } from 'typeorm'

import { AuctionItem } from '../../../domain/entities'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'

export default class AuctionItemRepository implements IAuctionItemRepository {
  findAll (): Promise<AuctionItem[]> {
    return getRepository(AuctionItem).find()
  }

  async findByAuctionId (auctionId: string): Promise<AuctionItem[]> {
    return getRepository(AuctionItem).find({ auctionId: auctionId })
  }

  async findById (auctionItemId: string): Promise<AuctionItem> {
    return getRepository(AuctionItem).findOne({ id: auctionItemId })
  }

  async updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem> {
    const auctionItem = await this.findById(auctionItemId)
    auctionItem.auctionId = auctionId
    return getRepository(AuctionItem).save(auctionItem)
  }
}
