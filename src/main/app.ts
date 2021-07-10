import express from 'express'
import { setupMiddlewares, setupRoutes } from './config'

const app = express()
setupMiddlewares(app)
setupRoutes(app)

export default app
