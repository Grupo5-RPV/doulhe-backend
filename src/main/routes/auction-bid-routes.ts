import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createAuctionBidFactory } from '../factories/auction-bid/auction-bid-factory'
import { auth } from '../middlewares'
import { ParticipantRepository } from '../../infra/typeorm/repositories'

const router = Router()

router.post('/auction-bid', auth(new ParticipantRepository()), adaptRoute(createAuctionBidFactory()))

export default router
