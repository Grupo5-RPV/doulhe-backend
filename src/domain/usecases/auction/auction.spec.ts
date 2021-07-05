import { Auction, Auctioneer, AuctionItem } from '../../../domain/entities'
import CreateAuction from './create-auction'
import ICreateAuctionParams from './create-auction-params'

import IAuctionRepository from '../../../data/protocols/db/auction-repository'
import IAuctionItemRepository from '../../../data/protocols/db/auction-item-repository'
import IAuctioneerRepository from 'src/data/protocols/db/auctioneer-repository'

const makeAuctionRepository = () => {
  class AuctionRepositorySpy implements IAuctionRepository {
    private database: Auction[] = []

    async create (createAuctionData: ICreateAuctionParams) {
      const auction = new Auction()
      auction.id = createAuctionData.id
      auction.start = createAuctionData.start
      auction.end = createAuctionData.end || null
      auction.auctioneerId = createAuctionData.auctioneerId
      auction.closed = 0
      this.database.push(auction)

      return auction
    }

    async findById (id: string) {
      return this.database.find(item => item.id === id)
    }
  }
  return new AuctionRepositorySpy()
}

const makeAuctionItemRepository = () => {
  class AuctionItemRepositorySpy implements IAuctionItemRepository {
    private database: AuctionItem[] = []

    createValidData () {
      const item = new AuctionItem()
      item.id = '1'
      item.title = 'Item A'
      item.description = 'Item bom'
      item.minimumBid = 200
      item.imagePath = 'www.image.com/item'
      item.finishedOff = 0
      item.auctionId = '1'
      item.categoryId = '1'
      item.itemProviderId = '1'
      return item
    }

    findById (id: string) {
      return new Promise<AuctionItem>((resolve, reject) => {
        resolve(this.database.find(item => item.id === id))
        reject(new Error('Item não encontrado'))
      })
    }

    async updateAuctionId (auctionId: string, auctionItemId: string) {
      const item = await this.findById(auctionItemId)
      return new Promise<AuctionItem>((resolve, reject) => {
        resolve(this.auctionIdUpdatePromise(item, auctionId))
        reject(console.error)
      })
    }

    private auctionIdUpdatePromise (auctionItem: AuctionItem, auctionId: string) {
      auctionItem.auctionId = auctionId
      this.database.push(auctionItem)
      return auctionItem
    }
  }
  return new AuctionItemRepositorySpy()
}

const makeAuctioneerRepository = () => {
  class AuctioneerRepositorySpy implements IAuctioneerRepository {
    private database: Auctioneer[] = []

    findById (id: string) {
      const auctioneer = new Promise<Auctioneer>((resolve, reject) => {
        resolve(this.database.find(item => item.id === id))
        reject(new Error('Leiloeiro não encontrado'))
      })
      return auctioneer
    }

    createValidData () {
      const auctioneer = new Auctioneer()
      auctioneer.id = '1'
      auctioneer.name = 'John'
      auctioneer.email = 'john@mail.com'
      auctioneer.password = '123'
      auctioneer.address = 'Rua ABC 11'
      auctioneer.phone = '998765421'
      auctioneer.joinedAt = '2016-06-22 19:10:25'
      return auctioneer
    }
  }
  return new AuctioneerRepositorySpy()
}

const makeSut = () => {
  const auctionRepositorySpy = makeAuctionRepository()
  const auctionItemRepositorySpy = makeAuctionItemRepository()
  const auctioneerRepositorySpy = makeAuctioneerRepository()
  const createAuction = new CreateAuction(
    auctionRepositorySpy,
    auctionItemRepositorySpy,
    auctioneerRepositorySpy
  )

  return {
    auctionRepositorySpy,
    auctionItemRepositorySpy,
    auctioneerRepositorySpy,
    createAuction
  }
}

describe('Create Auction UC', () => {
  test('Create auction with valid data', async () => {
    const { createAuction, auctionRepositorySpy } = makeSut()
    await createAuction.create({
      id: 'valid_id',
      start: '2016-06-22 19:10:25',
      end: '2016-06-24 19:10:25',
      auctionItems: ['1'],
      auctioneerId: '1000'
    })
    await auctionRepositorySpy.findById('valid_id')
      .then((auction) => {
        expect(auction).toBeTruthy()
      })
  })

  test('Create auction with not existent auctioneer', async () => {
    const {
      createAuction,
      auctionItemRepositorySpy,
      auctioneerRepositorySpy
    } = makeSut()
    auctionItemRepositorySpy.createValidData()
    auctioneerRepositorySpy.createValidData()
    const itemPromise = await createAuction.create({
      id: '123',
      start: '2016-06-22 19:10:25',
      end: '2016-06-24 19:10:25',
      auctionItems: ['1'],
      auctioneerId: 'invalid_id'
    })
    expect(itemPromise).toBe(4)
  })
})
