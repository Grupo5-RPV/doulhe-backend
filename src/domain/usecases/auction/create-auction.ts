import { Auction } from '../../entities'
import ICreateAuctionParams from '../../../domain/usecases/auction/create-auction-params'
import InvalidParamError from '../../../presentation/errors/invalid-param-error'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import IAuctionRepository from '../../../data/protocols/db/auction-repository'
import { IdGenerator } from '../../../data/protocols/identification/id-generator'
import { MissingParamError } from '../../../presentation/errors'
import { UseCase } from '../../../presentation/protocols'
import { UserRepository } from 'src/data/protocols/db'
import { Auctioneer } from 'src/domain/entities'

export default class CreateAuction implements UseCase {
  constructor (
    private auctionRepository: IAuctionRepository,
    private auctionItemRepository: IAuctionItemRepository,
    private auctioneerRepository: UserRepository<Auctioneer>,
    private idGenerator: IdGenerator
  ) {
    this.auctionRepository = auctionRepository
    this.auctionItemRepository = auctionItemRepository
    this.auctioneerRepository = auctioneerRepository
    this.idGenerator = idGenerator
  }

  async execute (auctionData: ICreateAuctionParams): Promise<Auction> {
    auctionData.id = this.idGenerator.createUUID()

    const auctioneer = await this.auctioneerRepository.findById(auctionData.auctioneerId)

    if (auctioneer == null) {
      throw new MissingParamError('O leiloeiro com o id informado não existe')
    }

    for (const auctionItemId of auctionData.auctionItems) {
      const item = await this.auctionItemRepository.findById(auctionItemId)
      if (!item) {
        throw new InvalidParamError('O item informado não existe')
      }
      if (item.auctionId) {
        throw new InvalidParamError(`O item ${auctionItemId} já está atribuído a outro leilão`)
      }
    }

    for (const auctionItemId of auctionData.auctionItems) {
      const item = await this.auctionItemRepository.findById(auctionItemId)
      this.auctionItemRepository.updateAuctionId(auctionData.id, item.id)
    }

    return this.auctionRepository.create(auctionData)
  }
}
