import { UseCase } from '../../../presentation/protocols'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import ICategoryRepository from '../../../data/protocols/db/category-repository'
import IAuctionRepository from '../../../data/protocols/db/auction-repository'
import IAuctionBidRepository from '../../../data/protocols/db/auction-bid-repository'

interface ItemsByAuctionPresentation {
  id : string,
  name : string,
  category : string,
  image : string
  finalDate : string,
  highestBid : number,
  initialBid : number
}

export default class FindItemsByAuction implements UseCase {
  constructor (
    private auctionItemRepository: IAuctionItemRepository,
    private categoryRepository: ICategoryRepository,
    private auctionRepository: IAuctionRepository,
    private auctionBidRepository: IAuctionBidRepository
  ) {
    this.auctionItemRepository = auctionItemRepository
    this.categoryRepository = categoryRepository
    this.auctionRepository = auctionRepository
    this.auctionBidRepository = auctionBidRepository
  }

  async execute (id: string): Promise<ItemsByAuctionPresentation> {
    const item = await this.auctionItemRepository.findById(id)

    console.log(item)
    const auction = await this.auctionRepository.findById(item.auctionId)
    const category = await this.categoryRepository.findById(item.categoryId)
    const highestBid = await this.auctionBidRepository.highestBid(item.id)

    const itemDto = {
      id: item.id,
      name: item.title,
      category: category.name,
      image: item.imagePath,
      finalDate: auction.end,
      highestBid: highestBid ? highestBid.value : item.minimumBid,
      initialBid: item.minimumBid
    } as ItemsByAuctionPresentation

    // for (const item of items) {
    //   const category = await this.categoryRepository.findById(item.categoryId)
    //   const highestBid = await this.auctionBidRepository.highestBid(item.id)
    //   itemsByAuction.push({
    //     id: item.id,
    //     name: item.title,
    //     category: category.name,
    //     image: item.imagePath,
    //     finalDate: auction.end,
    //     highestBid: highestBid.value,
    //     initialBid: item.minimumBid
    //   } as ItemsByAuctionPresentation)
    // }

    return itemDto
  }
}
