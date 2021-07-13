import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import { IdGenerator } from '../../../data/protocols/identification/id-generator'
import { AuctionItem } from '../../../domain/entities'
import { UseCase } from '../../../presentation/protocols'
import ICreateAuctionItemParams from './create-auction-item-params'

export default class CreateAuctionItem implements UseCase {
  constructor (
    private auctionItemRepository: IAuctionItemRepository,
    private idGenerator: IdGenerator
  ) {
    this.auctionItemRepository = auctionItemRepository
    this.idGenerator = idGenerator
  }

  async execute (itemData: ICreateAuctionItemParams): Promise<AuctionItem> {
    itemData.id = this.idGenerator.createUUID()
    return this.auctionItemRepository.create(itemData)
  }
}
