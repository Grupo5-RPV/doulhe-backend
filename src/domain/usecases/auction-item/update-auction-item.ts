import { AuctionItem } from 'src/domain/entities'

export default interface IUpdateAuctionItem {
  updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem>
}
