import Auction from '../../domain/entities/auction'
import ICreateAuction from '../../domain/usecases/auction/create-auction'
import ICreateAuctionParams from '../../domain/usecases/auction/create-auction-params'
import InvalidParamError from '../../presentation/errors/invalid-param-error'
import { badRequest, notFound } from '../../presentation/helpers/http-helper'
import IAuctionItemRepository from '../protocols/db/auction-item-repository'
import IAuctionRepository from '../protocols/db/auction-repository'

export default class DbCreateAuction implements ICreateAuction {
  constructor (
    private auctionRepository: IAuctionRepository,
    private auctionItemRepository: IAuctionItemRepository
  ) {
    this.auctionRepository = auctionRepository
    this.auctionItemRepository = auctionItemRepository
  }

  async create (auctionData: ICreateAuctionParams): Promise<Auction> {
    auctionData.auctionItems.forEach(async itemId => {
      const item = await this.auctionItemRepository.findById(itemId)
      if (!item) {
        return notFound(new InvalidParamError('O item informado não existe'))
      }

      if (!item.auctionId) {
        return badRequest(new InvalidParamError(`O item ${itemId} já está atribuído a outro leilão`))
      }
    })

    const auction: Auction = await this.auctionRepository.create(auctionData)

    auctionData.auctionItems.forEach(itemId => {
      this.auctionItemRepository.updateAuctionId(auction.id, itemId)
    })

    return auction
  }
}
