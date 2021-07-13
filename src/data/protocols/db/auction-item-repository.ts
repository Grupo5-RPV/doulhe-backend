import ICreateAuctionItemParams from '../../../domain/usecases/auction-item/create-auction-item-params'
import { AuctionItem } from '../../../domain/entities'

export default interface IAuctionItemRepository {
  create (data: ICreateAuctionItemParams): Promise<AuctionItem>
  updateAuctionId (auctionId: string, auctionItemId: string): Promise<AuctionItem>
  findById (auctionItemId: string): Promise<AuctionItem>
  findByAuctionId (auctionId: string): Promise<AuctionItem[]>
  findAll(): Promise<AuctionItem[]>
}
