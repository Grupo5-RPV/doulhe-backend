import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import IAuctionRepository from '../../../data/protocols/db/auction-repository'
import Auction from '../../entities/auction'
import AuctionDTO from './auction-dto'

export default class FindAllAuction {
  constructor (
    private readonly auctionRepository: IAuctionRepository,
    private readonly auctionItemRepository: IAuctionItemRepository
  ) {
    this.auctionRepository = auctionRepository
    this.auctionItemRepository = auctionItemRepository
  }

  async findAll (): Promise<AuctionDTO[]> {
    const auctions = await this.auctionRepository.findAll()
    auctions.sort((a, b) => this.compare(a, b))

    const auctionsDto: AuctionDTO[] = []

    for (const auction of auctions) {
      const items = await this.auctionItemRepository.findByAuctionId(auction.id)
      const itemsDto = {
        ...auction,
        items
      } as AuctionDTO
      auctionsDto.push(itemsDto)
    }

    return auctionsDto
  }

  compare (auction1:Auction, auction2:Auction):number {
    if (auction1.end && auction2) {
      const endDate1 = new Date(auction1.end)
      const endDate2 = new Date(auction2.end)
      if (endDate1 < endDate2) {
        return 1
      }
      return -1
    }
    return 0
  }
}
