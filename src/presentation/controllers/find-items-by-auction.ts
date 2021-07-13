import FindItemsByAuction from '../../domain/usecases/auction-item/find-items-by-auction'
import InvalidParamError from '../errors/invalid-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import Controller from '../protocols/controller'
import httpRequest from '../protocols/http-request'
import httpResponse from '../protocols/http-response'

export default class FindItemsByAuctionController implements Controller {
  constructor (
        private readonly findItemsByAuction: FindItemsByAuction
  ) {
    this.findItemsByAuction = findItemsByAuction
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    const { id } = httpRequest.body

    try {
      const items = await this.findItemsByAuction.execute(id)
      return ok(items)
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      console.log(error)
      return serverError(error)
    }
  }
}
