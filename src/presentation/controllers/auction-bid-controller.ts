import IAuctionBid from '../../domain/usecases/auction-bid/auction-bid'
import InvalidParamError from '../errors/invalid-param-error'
import MissingParamError from '../errors/missing-param-error'
import { badRequest, serverError, ok, notFound } from '../helpers/http-helper'
import Controller from '../protocols/controller'
import httpRequest from '../protocols/http-request'
import httpResponse from '../protocols/http-response'
import Validation from '../protocols/validation'

export default class CreateAuctionBidController implements Controller {
  constructor (
    private validator: Validation,
    private createAuctionBid: IAuctionBid
  ) {
    this.validator = validator
    this.createAuctionBid = createAuctionBid
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { id, timestamp, value, auctionItemId, participantId } = httpRequest.body
      const auctionBid = await this.createAuctionBid.newBid({
        id,
        timestamp,
        value,
        auctionItemId,
        participantId
      })
      return ok(auctionBid)
    } catch (error) {
      console.log(error)
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      if (error instanceof MissingParamError) {
        return notFound(error)
      }
      return serverError(error)
    }
  }
}
