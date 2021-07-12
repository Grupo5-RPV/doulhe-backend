import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import { AuctionItem } from '../../../domain/entities'

export default class UpdateAuctionItem {
  constructor (
    private auctionItemsRepository: IAuctionItemRepository
  ) {
    this.auctionItemsRepository = auctionItemsRepository
  }

  async updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem> {
    return this.auctionItemsRepository.updateAuctionId(auctionId, auctionItemId)
  }
}
