import { UserRepository } from '../../data/protocols/db'
import { AuthMiddleware } from '../../presentation/middlewares/auth-middleware'
import expressMiddlewareAdapter from '../adapters/express/express-middleware-adapter'

const auth = (role: UserRepository<any>) => {
  return expressMiddlewareAdapter(new AuthMiddleware(role))
}

export default auth
