import Controller from '../../../presentation/protocols/controller'
import { AuctionItemRepository, AuctionRepository } from '../../../infra/typeorm/repositories'
import FindItemsByAuction from '../../../domain/usecases/auction-item/find-items-by-auction'
import CategoryRepository from '../../../infra/typeorm/repositories/category-repository'
import AuctionBidRepository from '../../../infra/typeorm/repositories/auction-bid-repository'
import FindItemsByAuctionController from '../../../presentation/controllers/find-items-by-auction'

export const findItemsByAuctionFactory = (): Controller => {
  const findItemsByAuction = new FindItemsByAuction(
    new AuctionItemRepository(),
    new CategoryRepository(),
    new AuctionRepository(),
    new AuctionBidRepository()
  )
  return new FindItemsByAuctionController(findItemsByAuction)
}
