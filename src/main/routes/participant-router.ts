import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createParticipantFactory } from '../factories/create-participant/create-participant-factory'

const router = Router()

router.post('/participants', adaptRoute(createParticipantFactory()))

export default router
