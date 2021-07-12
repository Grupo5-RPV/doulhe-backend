import { UseCase } from '../../../presentation/protocols'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import { AuctionItem } from '../../../domain/entities'

export default class FindAuctionItems implements UseCase {
  constructor (
    private auctionItemsRepository: IAuctionItemRepository
  ) {
    this.auctionItemsRepository = auctionItemsRepository
  }

  async execute (auctionItemId: string): Promise<AuctionItem> {
    return this.auctionItemsRepository.findById(auctionItemId)
  }
}
