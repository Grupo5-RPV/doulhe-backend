import AuctionBid from '../../entities/auction-bid'
import IBidParams from './auction-bid-params'
import { IdGenerator } from '../../../data/protocols/identification/id-generator'
import InvalidParamError from '../../../presentation/errors/invalid-param-error'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import IAuctionBidRepository from '../../../data/protocols/db/auction-bid-repository'

export default class Bid {
  constructor (
    private idGenerator: IdGenerator,
    private auctionBid: IAuctionBidRepository,
    private auctionItem: IAuctionItemRepository
  ) {
    this.idGenerator = idGenerator
    this.auctionBid = auctionBid
    this.auctionItem = auctionItem
  }

  async newBid (bid : IBidParams): Promise<AuctionBid> {
    bid.id = this.idGenerator.createUUID()
    const itemValue = await this.auctionItem.findById(bid.auctionItemId)
    console.log(itemValue.minimumBid)
    const highestBid = await this.auctionBid.highestBid(bid.auctionItemId)
    if (bid.value == null) {
      throw new InvalidParamError('Nenhum valor foi informado')
    }
    if (!highestBid === true) {
      if (bid.value <= itemValue.minimumBid) {
        throw new InvalidParamError(`o lance deve ser maior que: ${itemValue.minimumBid}`)
      } else {
        return this.auctionBid.newBid(bid)
      }
    }
    if (highestBid.value >= bid.value) {
      throw new InvalidParamError(`o lance deve ser maior que: ${highestBid.value}`)
    } else {
      return this.auctionBid.newBid(bid)
    }
  }
}
