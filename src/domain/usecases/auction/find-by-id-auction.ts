import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import IAuctionRepository from '../../../data/protocols/db/auction-repository'
import InvalidParamError from '../../../presentation/errors/invalid-param-error'
import AuctionDTO from './auction-dto'

export default class FindByIdAuction {
  constructor (
      private readonly auctionRepository: IAuctionRepository,
      private readonly auctionItemRepository: IAuctionItemRepository
  ) {
    this.auctionRepository = auctionRepository
    this.auctionItemRepository = auctionItemRepository
  }

  async findById (id: string): Promise<AuctionDTO> {
    const auction = await this.auctionRepository.findById(id)
    if (!auction) {
      throw new InvalidParamError('Leilão não existe Id: ' + id)
    }
    const items = await this.auctionItemRepository.findByAuctionId(auction.id)
    const auctionDto = {
      ...auction,
      items
    } as AuctionDTO

    return auctionDto
  }
}
