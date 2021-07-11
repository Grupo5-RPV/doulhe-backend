import { NextFunction, Request, Response } from 'express'
import AuthMiddlewareParams from '../../../domain/usecases/auth/auth-middleware-params'
import Middleware from '../../../presentation/protocols/middleware'

const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      token: req.headers.authorization
    } as AuthMiddlewareParams

    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}

export default expressMiddlewareAdapter
