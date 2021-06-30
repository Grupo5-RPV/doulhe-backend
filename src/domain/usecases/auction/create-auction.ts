import Auction from '../../entities/auction'
import ICreateAuctionParams from '../../../domain/usecases/auction/create-auction-params'
import InvalidParamError from '../../../presentation/errors/invalid-param-error'
import { badRequest, notFound } from '../../../presentation/helpers/http-helper'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import IAuctionRepository from '../../../data/protocols/db/auction-repository'

export default class CreateAuction {
  constructor (
    private auctionRepository: IAuctionRepository,
    private auctionItemRepository: IAuctionItemRepository
  ) {
    this.auctionRepository = auctionRepository
    this.auctionItemRepository = auctionItemRepository
  }

  async create (auctionData: ICreateAuctionParams): Promise<Auction> {
    const auction: Auction = await this.auctionRepository.create(auctionData)

    this.checkItemAvailability(auctionData.auctionItems)
    this.assignItemToAuction(auctionData.id, auctionData.auctionItems)

    return auction
  }

  private checkItemAvailability (auctionItemIds: string[]): void {
    auctionItemIds.forEach(async itemId => {
      const item = await this.auctionItemRepository.findById(itemId)
      if (item == null) {
        return notFound(new InvalidParamError('O item informado não existe'))
      }

      if (item.auctionId == null) {
        return badRequest(new InvalidParamError(`O item ${itemId} já está atribuído a outro leilão`))
      }
    })
  }

  private assignItemToAuction (auctionId: string, auctionItemIds: string[]): void {
    auctionItemIds.forEach(itemId => {
      this.auctionItemRepository.updateAuctionId(auctionId, itemId)
    })
  }
}
