import FindAllAuction from '../../../domain/usecases/auction/find-all-auction'
import FindAllAuctionController from '../../../presentation/controllers/find-all-auction-controller'
import AuctionRepository from '../../../infra/typeorm/repositories/auction-repository'
import Controller from '../../../presentation/protocols/controller'
import { AuctionItemRepository } from '../../../infra/typeorm/repositories'

export const findAllAuctionFactory = (): Controller => {
  const findAllAuction = new FindAllAuction(
    new AuctionRepository(),
    new AuctionItemRepository()
  )
  return new FindAllAuctionController(findAllAuction)
}
