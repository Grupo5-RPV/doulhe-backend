import { AuctionItem } from '../../../domain/entities'

export default interface IAuctionItemRepository {
  updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem>
  findById (auctionItemId: string): Promise<AuctionItem>
  findByAuctionId (auctionId: string): Promise<AuctionItem[]>
  findAll(): Promise<AuctionItem[]>
}
