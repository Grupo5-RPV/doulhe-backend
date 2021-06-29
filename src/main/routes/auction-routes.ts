import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createAuctionFactory } from '../factories/create-auction/create-auction-factory'

const router = Router()

router.post('/auctions', adaptRoute(createAuctionFactory()))

export default router
