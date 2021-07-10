import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createAuctionFactory } from '../factories/create-auction/create-auction-factory'
import { findAllAuctionFactory } from '../factories/find-auction/find-all-auction-factory'
import { findByIdAuctionFactory } from '../factories/find-auction/find-by-id-auction-factory'
const router = Router()
router.post('/auctions', adaptRoute(createAuctionFactory()))
router.get('/auctions',adaptRoute(findAllAuctionFactory()))
router.get('/auctions/:id',adaptRoute(findByIdAuctionFactory()))
export default router
