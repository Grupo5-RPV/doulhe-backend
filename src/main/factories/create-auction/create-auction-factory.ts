import DbCreateAuction from '../../../data/usecases/db-create-auction'
import AuctionItemRepository from '../../../infra/repositories/auction-item-repository'
import AuctionRepository from '../../../infra/repositories/auction-repository'
import CreateAuctionController from '../../../presentation/controllers/create-auction-controller'
import Controller from '../../../presentation/protocols/controller'
import Validation from '../../../presentation/protocols/validation'
import { CreateAuctionValidationFactory } from './create-auction-validation-factory'

class SomeValidation implements Validation {
  validate (input: any): Error {
    throw new Error('Method not implemented.')
  }
}

export const createAuctionFactory = (): Controller => {
  const auctionRepository = new AuctionRepository()
  const auctionItemRepository = new AuctionItemRepository()
  const dbCreateAuction = new DbCreateAuction(auctionRepository, auctionItemRepository)
  return new CreateAuctionController(CreateAuctionValidationFactory(), dbCreateAuction)
}
