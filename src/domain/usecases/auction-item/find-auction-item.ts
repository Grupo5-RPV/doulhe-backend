import { AuctionItem } from 'src/domain/entities'

export default interface IFindAuctionItem {
  findById (auctionItemId: string): Promise<AuctionItem>
}
