import AuctionBid from '../../entities/auction-bid'
import IBidParams from './auction-bid-params'
import IAuctioBidRepository from 'src/data/protocols/db/auction-bid-repository'
import { IdGenerator } from '../../../data/protocols/identification/id-generator'
import InvalidParamError from '../../../presentation/errors/invalid-param-error'

export default class Bid {
  constructor (
    private idGenerator: IdGenerator,
    private auctioBid: IAuctioBidRepository
  ) {
    this.idGenerator = idGenerator
    this.auctioBid = auctioBid
  }

  async newBid (bid : IBidParams): Promise<AuctionBid> {
    bid.id = this.idGenerator.createUUID()

    const highestBid = await this.auctioBid.highestBid(bid.auctionItemId)

    if (bid.value == null) {
      throw new InvalidParamError('Nenhum valor foi informado')
    }
    if (highestBid.value >= bid.value) {
      throw new InvalidParamError(`O valor informado é menor que o maior lance atual de: ${highestBid.value}`)
    } else {
      return this.auctioBid.newBid(bid)
    }
  }
}
