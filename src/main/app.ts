import express from 'express'
import auctionRoutes from './routes/auction-routes'
import participantRouter from './routes/participant-router'
import auctionBidRouter from './routes/auction-bid-routes'

const app = express()
app.use(express.json())
app.use(auctionRoutes)
app.use(participantRouter)
app.use(auctionBidRouter)

export default app
