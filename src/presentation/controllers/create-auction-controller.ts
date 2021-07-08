import ICreateAuction from '../../domain/usecases/auction/create-auction'
import InvalidParamError from '../errors/invalid-param-error'
import MissingParamError from '../errors/missing-param-error'
import { badRequest, serverError, ok, notFound } from '../helpers/http-helper'
import Controller from '../protocols/controller'
import httpRequest from '../protocols/http-request'
import httpResponse from '../protocols/http-response'
import Validation from '../protocols/validation'

export default class CreateAuctionController implements Controller {
  constructor (
    private validator: Validation,
    private createAuction: ICreateAuction
  ) {
    this.validator = validator
    this.createAuction = createAuction
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { id, start, end, auctionItems, auctioneerId } = httpRequest.body

      const auction = await this.createAuction.create({
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
