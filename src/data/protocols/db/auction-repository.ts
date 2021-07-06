import { Auction } from 'src/domain/entities'
import ICreateAuctionParams from 'src/domain/usecases/auction/create-auction-params'

export default interface IAuctionRepository {
  create(auctionData: ICreateAuctionParams): Promise<Auction>
}
