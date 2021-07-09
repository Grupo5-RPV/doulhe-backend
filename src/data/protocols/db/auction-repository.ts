import { Auction } from '../../../domain/entities'
import ICreateAuctionParams from '../../../domain/usecases/auction/create-auction-params'

export default interface IAuctionRepository {
  create(auctionData: ICreateAuctionParams): Promise<Auction>
  findById(id: string): Promise<Auction>
  findAll(): Promise<Auction[]>
}
