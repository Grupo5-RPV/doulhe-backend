import { getRepository, Repository } from 'typeorm'

import { AuctionItem } from '../../domain/entities'
import IAuctionItemRepository from '../../data/protocols/db/auction-item-repository'

export default class AuctionItemRepository implements IAuctionItemRepository {
  private repository: Repository<AuctionItem>

  constructor () {
    this.repository = getRepository(AuctionItem)
  }

  async findById (auctionItemId: string): Promise<AuctionItem> {
    return await this.repository.findOne({ id: auctionItemId })
  }

  async updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem> {
    const auctionItem = await this.repository.findOne({ id: auctionItemId })
    auctionItem.auctionId = auctionId
    return await this.repository.save(auctionItem)
  }
}
