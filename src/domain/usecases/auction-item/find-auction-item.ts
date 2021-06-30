import IAuctionItemRepository from 'src/data/protocols/db/auction-item-repository'
import { AuctionItem } from 'src/domain/entities'

export default class FindAuctionItems {
  constructor (
    private auctionItemsRepository: IAuctionItemRepository
  ) {
    this.auctionItemsRepository = auctionItemsRepository
  }

  async findById (auctionItemId: string): Promise<AuctionItem> {
    const item: AuctionItem = await this.auctionItemsRepository.findById(auctionItemId)
    return item
  }
}
