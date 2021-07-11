import { Router } from 'express'
import { AuctioneerRepository, ParticipantRepository } from '../../infra/typeorm/repositories'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { authFactory } from '../factories/auth/auth-factory'

const router = Router()

router.post('/participants/login', adaptRoute(authFactory(new ParticipantRepository())))
router.post('/admin/login', adaptRoute(authFactory(new AuctioneerRepository())))

export default router
