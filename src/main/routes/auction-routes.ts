import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { createAuctionFactory } from '../factories/create-auction/create-auction-factory'

export default (router: Router): void => {
  router.post('/auctions', adaptRoute(createAuctionFactory()))
}
