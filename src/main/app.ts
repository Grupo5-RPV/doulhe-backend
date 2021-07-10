import express from 'express'
import auctionRoutes from './routes/auction-routes'
import participantRouter from './routes/participant-router'

const app = express()
app.use(express.json())
app.use(auctionRoutes)
app.use(participantRouter)

export default app
