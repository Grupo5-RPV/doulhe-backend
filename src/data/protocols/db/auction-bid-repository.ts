import { AuctionBid } from '../../../domain/entities'
import IBidParams from '../../../domain/usecases/auction-bid/auction-bid-params'

export default interface IAuctionBidRepository{
    highestBid (auctionItemId: string): Promise<AuctionBid>
    newBid (auctionBidData: IBidParams): Promise<AuctionBid>
}
