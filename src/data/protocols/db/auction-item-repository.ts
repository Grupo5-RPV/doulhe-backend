import { AuctionItem } from 'src/domain/entities'

export default interface IAuctionItemRepository {
  updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem>
  findById (auctionItemId: string): Promise<AuctionItem>
}
