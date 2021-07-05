import AuctioneerRepository from '../../../infra/repositories/auctioneer-repository'
import CreateAuction from '../../../domain/usecases/auction/create-auction'
import AuctionItemRepository from '../../../infra/repositories/auction-item-repository'
import AuctionRepository from '../../../infra/repositories/auction-repository'
import CreateAuctionController from '../../../presentation/controllers/create-auction-controller'
import Controller from '../../../presentation/protocols/controller'
import { CreateAuctionValidationFactory } from './create-auction-validation-factory'

export const createAuctionFactory = (): Controller => {
  const auctionRepository = new AuctionRepository()
  const auctionItemRepository = new AuctionItemRepository()
  const auctioneerRepository = new AuctioneerRepository()
  const createAuctionUseCase = new CreateAuction(auctionRepository, auctionItemRepository, auctioneerRepository)
  return new CreateAuctionController(CreateAuctionValidationFactory(), createAuctionUseCase)
}
