import FindAllAuctionItems from '../../domain/usecases/auction-item/find-all-auction-item'
import { ok, serverError } from '../helpers/http-helper'
import Controller from '../protocols/controller'
import httpRequest from '../protocols/http-request'
import httpResponse from '../protocols/http-response'

export default class FindAllAuctionItemsController implements Controller {
  constructor (
        private readonly findAllAuctionItemUseCase: FindAllAuctionItems
  ) {
    this.findAllAuctionItemUseCase = findAllAuctionItemUseCase
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const auctions = await this.findAllAuctionItemUseCase.execute()
      return ok(auctions)
    } catch (error) {
      return serverError(error)
    }
  }
}
