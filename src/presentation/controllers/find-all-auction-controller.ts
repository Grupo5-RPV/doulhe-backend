import FindAllAuction from '../../domain/usecases/auction/find-all-auction'
import { ok, serverError } from '../helpers/http-helper'
import Controller from '../protocols/controller'
import httpRequest from '../protocols/http-request'
import httpResponse from '../protocols/http-response'

export default class FindAllAuctionController implements Controller {
  constructor (
        private readonly findByIdAuction: FindAllAuction
  ) {
    this.findByIdAuction = findByIdAuction
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const auctions = await this.findByIdAuction.findAll()
      return ok(auctions)
    } catch (error) {
      return serverError(error)
    }
  }
}
