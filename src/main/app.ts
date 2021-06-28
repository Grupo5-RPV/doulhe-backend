import express from 'express'
import setupRoute from './config/routes'

const app = express()
app.use(express.json())

setupRoute(app)

export default app
