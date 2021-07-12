import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createAuctionBidFactory } from '../factories/auction-bid/auction-bid-factory'

const router = Router()

router.post('/auction-bid', adaptRoute(createAuctionBidFactory()))

export default router
