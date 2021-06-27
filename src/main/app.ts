import express from 'express'
import router from './routes/auction-routes'
import setupRoute from './config/routes'

const app = express()
app.use(express.json())
//app.use(router)

setupRoute(app)

export default app
