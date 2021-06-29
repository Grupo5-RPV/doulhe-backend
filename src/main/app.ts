import express from 'express'
import auctionRoutes from './routes/auction-routes'

const app = express()
app.use(express.json())
app.use(auctionRoutes)

export default app
