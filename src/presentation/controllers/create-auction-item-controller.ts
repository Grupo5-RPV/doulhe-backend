import CreateAuctionItem from '../../domain/usecases/auction-item/create-auction-item'
import { badRequest, serverError, ok } from '../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../protocols'

export default class CreateAuctionItemController implements Controller {
  constructor (
    private validator: Validation,
    private createAuctionItem: CreateAuctionItem
  ) {
    this.validator = validator
    this.createAuctionItem = createAuctionItem
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { title, description, minimumBid, imagePath, categoryId, itemProviderId } = httpRequest.body

      const item = await this.createAuctionItem.execute({
        title,
        description,
        minimumBid,
        imagePath,
        categoryId,
        itemProviderId
      })

      return ok(item)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
