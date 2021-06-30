import IAuctionItemRepository from 'src/data/protocols/db/auction-item-repository'
import { AuctionItem } from 'src/domain/entities'

export default class UpdateAuctionItem {
  constructor (
    private auctionItemsRepository: IAuctionItemRepository
  ) {
    this.auctionItemsRepository = auctionItemsRepository
  }

  async updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem> {
    return await this.auctionItemsRepository.updateAuctionId(auctionId, auctionItemId)
  }
}
