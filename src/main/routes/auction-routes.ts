import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createAuctionFactory } from '../factories/create-auction/create-auction-factory'
import { createParticipantFactory } from '../factories/create-participant/create-participant-factory'

const router = Router()

router.post('/auctions', adaptRoute(createAuctionFactory()))
router.post('/participants',adaptRoute(createParticipantFactory()))
export default router
