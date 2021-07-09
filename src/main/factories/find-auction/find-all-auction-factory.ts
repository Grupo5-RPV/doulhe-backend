import FindAllAuction from "../../../domain/usecases/auction/find-all-auction"
import FindAllAuctionController from "../../../presentation/controllers/find-all-auction-controller"
import AuctionRepository from '../../../infra/typeorm/repositories/auction-repository'
import Controller from "../../../presentation/protocols/controller"
export const findAllAuctionFactory = (): Controller =>{
    const findAllAuction = new FindAllAuction(
        new AuctionRepository,
    )
    return new FindAllAuctionController(findAllAuction)
}