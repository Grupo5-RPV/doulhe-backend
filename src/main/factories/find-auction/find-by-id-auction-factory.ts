import AuctionRepository from '../../../infra/typeorm/repositories/auction-repository'
import FindByIdAuction from '../../../domain/usecases/auction/find-by-id-auction'
import Controller from '../../../presentation/protocols/controller'
import FindByIdAuctionController from '../../../presentation/controllers/find-by-id-auction-controller'
import { AuctionItemRepository } from '../../../infra/typeorm/repositories'

const findByIdAuctionFactory = (): Controller => {
  const findByIdAuction = new FindByIdAuction(
    new AuctionRepository(),
    new AuctionItemRepository()
  )
  return new FindByIdAuctionController(findByIdAuction)
}

export default findByIdAuctionFactory
