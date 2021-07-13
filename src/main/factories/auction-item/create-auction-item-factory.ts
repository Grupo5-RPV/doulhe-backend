import AuctionItemRepository from '../../../infra/typeorm/repositories/auction-item-repository'
import { Controller } from '../../../presentation/protocols'
import CreateAuctionItem from '../../../domain/usecases/auction-item/create-auction-item'
import { CreateAuctionItemValidationFactory } from './create-auction-item-validation-factory'
import UUIDv4Adapter from '../../../infra/identification/uuidv4-adapter'
import CreateAuctionItemController from '../../../presentation/controllers/create-auction-item-controller'

export const createAuctionItemFactory = (): Controller => {
  const createAuctionItemUseCase = new CreateAuctionItem(
    new AuctionItemRepository(),
    new UUIDv4Adapter()
  )
  return new CreateAuctionItemController(CreateAuctionItemValidationFactory(), createAuctionItemUseCase)
}
