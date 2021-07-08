import AuctioneerRepository from '../../../infra/typeorm/repositories/auctioneer-repository'
import CreateAuction from '../../../domain/usecases/auction/create-auction'
import AuctionItemRepository from '../../../infra/typeorm/repositories/auction-item-repository'
import AuctionRepository from '../../../infra/typeorm/repositories/auction-repository'
import CreateAuctionController from '../../../presentation/controllers/create-auction-controller'
import Controller from '../../../presentation/protocols/controller'
import { CreateAuctionValidationFactory } from './create-auction-validation-factory'
import UUIDv4Adapter from '../../../infra/identification/uuidv4-adapter'

export const createAuctionFactory = (): Controller => {
  const createAuctionUseCase = new CreateAuction(new AuctionRepository(),
    new AuctionItemRepository(),
    new AuctioneerRepository(),
    new UUIDv4Adapter())
  return new CreateAuctionController(CreateAuctionValidationFactory(), createAuctionUseCase)
}
