import Auction from 'src/domain/entities/auction'
import CreateAuctionParams from './create-auction-params'

export default interface ICreateAuction {
  create (auction: CreateAuctionParams): Promise<Auction>
}
