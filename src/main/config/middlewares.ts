import { Express } from 'express'
import { bodyParser } from '../middlewares'

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
}

export default setupMiddlewares
