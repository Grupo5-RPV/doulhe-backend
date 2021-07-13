import AuctionBid from '../../entities/auction-bid'
import IBidParams from './auction-bid-params'
import { IdGenerator } from '../../../data/protocols/identification/id-generator'
import InvalidParamError from '../../../presentation/errors/invalid-param-error'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import IAuctionBidRepository from '../../../data/protocols/db/auction-bid-repository'
import { UserRepository } from '../../../data/protocols/db'
import { Participant } from '../../../domain/entities'

export default class Bid {
  constructor (
    private idGenerator: IdGenerator,
    private auctionBid: IAuctionBidRepository,
    private auctionItem: IAuctionItemRepository,
    private participantsRepository: UserRepository<Participant>
  ) {
    this.idGenerator = idGenerator
    this.auctionBid = auctionBid
    this.auctionItem = auctionItem
    this.participantsRepository = participantsRepository
  }

  async newBid (bid : IBidParams): Promise<AuctionBid> {
    bid.id = this.idGenerator.createUUID()

    const itemValue = await this.auctionItem.findById(bid.auctionItemId)
    const highestBid = await this.auctionBid.highestBid(bid.auctionItemId)

    if (!await this.participantsRepository.findById(bid.participantId)) {
      throw new InvalidParamError('O participante não existe')
    }

    // if (bid.value == null) {
    //   throw new InvalidParamError('Nenhum valor foi informado')
    // }

    if (!highestBid) {
      if (this.checkMinimumBidValue(bid.value, itemValue.minimumBid)) {
        throw new InvalidParamError(`o lance deve ser maior que: ${itemValue.minimumBid}`)
      }
    } else {
      if (this.checkMinimumBidValue(bid.value, highestBid.value)) {
        throw new InvalidParamError(`o lance deve ser maior que: ${highestBid.value}`)
      }
    }

    return this.auctionBid.newBid(bid)

    // if (!highestBid) {
    //   if (bid.value <= itemValue.minimumBid) {
    //     throw new InvalidParamError(`o lance deve ser maior que: ${itemValue.minimumBid}`)
    //   } else {
    //     return this.auctionBid.newBid(bid)
    //   }
    // }
    // if (highestBid.value >= bid.value) {
    //   throw new InvalidParamError(`o lance deve ser maior que: ${highestBid.value}`)
    // } else {
    //   return this.auctionBid.newBid(bid)
    // }
  }

  private checkMinimumBidValue (bidValue: number, requiredValue: number): boolean {
    return bidValue <= requiredValue
  }
}
