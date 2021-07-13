import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares'
import { AuctioneerRepository } from '../../infra/typeorm/repositories'
import { findAllAuctionItemFactory } from '../factories/auction-item/find-all-auction-item-factory'
import { createAuctionItemFactory } from '../factories/auction-item/create-auction-item-factory'

const router = Router()

router.get('/auction-items', auth(new AuctioneerRepository()), adaptRoute(findAllAuctionItemFactory()))
router.post('/auction-items', auth(new AuctioneerRepository()), adaptRoute(createAuctionItemFactory()))

export default router
