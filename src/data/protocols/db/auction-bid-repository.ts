import { AuctionBid } from '../../../domain/entities'
import IBidParams from 'src/domain/usecases/bid/auction-bid-params'

export default interface IAuctioBidRepository{
    highestBid (auctionItemId: string): Promise<AuctionBid>
    newBid (auctionBidData: IBidParams): Promise<AuctionBid>
}
