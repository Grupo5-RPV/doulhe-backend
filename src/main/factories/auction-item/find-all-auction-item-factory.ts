import Controller from '../../../presentation/protocols/controller'
import { AuctionItemRepository } from '../../../infra/typeorm/repositories'
import FindAllAuctionItems from '../../../domain/usecases/auction-item/find-all-auction-item'
import FindAllAuctionItemsController from '../../../presentation/controllers/find-all-auction-item-controller'

export const findAllAuctionItemFactory = (): Controller => {
  const findAllAuction = new FindAllAuctionItems(
    new AuctionItemRepository()
  )
  return new FindAllAuctionItemsController(findAllAuction)
}
