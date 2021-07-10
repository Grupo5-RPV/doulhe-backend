import AuctionRepository from "../../../infra/typeorm/repositories/auction-repository";
import FindByIdAuction from "../../../domain/usecases/auction/find-by-id-auction";
import Controller from "../../../presentation/protocols/controller";
import FindByIdAuctionController from "../../../presentation/controllers/find-by-id-auction-controller";

export const findByIdAuctionFactory = (): Controller =>{
    const findByIdAuction = new FindByIdAuction(
        new AuctionRepository
    )
    return new FindByIdAuctionController(findByIdAuction)
}