import { Router } from 'express'
import { AuctioneerRepository } from '../../infra/typeorm/repositories'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createAuctionFactory } from '../factories/create-auction/create-auction-factory'
import auth from '../middlewares/auth'

const router = Router()

router.post('/auctions', auth(new AuctioneerRepository()), adaptRoute(createAuctionFactory()))

export default router
