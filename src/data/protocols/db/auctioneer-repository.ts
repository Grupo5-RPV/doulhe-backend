import { Auctioneer } from '../../../domain/entities'

export default interface IAuctioneerRepository {
  findById(id: string): Promise<Auctioneer>
}
