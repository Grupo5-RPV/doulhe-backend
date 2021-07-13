import { UseCase } from '../../../presentation/protocols'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import { AuctionItem } from '../../../domain/entities'

export default class FindAllAuctionItems implements UseCase {
  constructor (
    private auctionItemsRepository: IAuctionItemRepository
  ) {
    this.auctionItemsRepository = auctionItemsRepository
  }

  async execute (): Promise<AuctionItem[]> {
    return await this.auctionItemsRepository.findAll()
  }
}
