import CreateAuction from '../../domain/usecases/auction/create-auction'
import InvalidParamError from '../errors/invalid-param-error'
import MissingParamError from '../errors/missing-param-error'
import { badRequest, serverError, ok, notFound } from '../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../protocols'

export default class CreateAuctionController implements Controller {
  constructor (
    private validator: Validation,
    private createAuction: CreateAuction
  ) {
    this.validator = validator
    this.createAuction = createAuction
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { id, start, end, auctionItems, auctioneerId } = httpRequest.body

      const auction = await this.createAuction.execute({
        id,
        start,
        end,
        auctionItems,
        auctioneerId
      })

      return ok(auction)
    } catch (error) {
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
