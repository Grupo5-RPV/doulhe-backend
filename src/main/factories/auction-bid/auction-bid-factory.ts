import AuctionItemRepository from '../../../infra/typeorm/repositories/auction-item-repository'
import Bid from '../../../domain/usecases/auction-bid/auction-bid'
import UUIDv4Adapter from '../../../infra/identification/uuidv4-adapter'
import AuctionBidRepository from '../../../infra/typeorm/repositories/auction-bid-repository'
import CreateAuctionBidController from '../../../presentation/controllers/auction-bid-controller'
import Controller from '../../../presentation/protocols/controller'
import { createAuctionBidValidationFactory } from './auction-bid-validation-factory'
import { ParticipantRepository } from '../../../infra/typeorm/repositories'

export const createAuctionBidFactory = (): Controller => {
  const auctionBid = new Bid(
    new UUIDv4Adapter(),
    new AuctionBidRepository(),
    new AuctionItemRepository(),
    new ParticipantRepository()
  )
  return new CreateAuctionBidController(createAuctionBidValidationFactory(), auctionBid)
}
