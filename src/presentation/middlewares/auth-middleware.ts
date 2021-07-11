import AuthMiddlewareParams from '../../domain/usecases/auth/auth-middleware-params'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { AccessDeniedError } from '../errors'
import { HttpResponse, Middleware } from '../protocols'
import { UserRepository } from '../../data/protocols/db'

class AuthMiddleware implements Middleware {
  constructor (
    private readonly userType: UserRepository<any>
  ) {
    this.userType = userType
  }

  async handle (request: AuthMiddlewareParams): Promise<HttpResponse> {
    try {
      let { token } = request
      token = this.parseBearerToken(token)
      if (token) {
        const user = await this.userType.findByToken(token)
        if (user) {
          return ok(user)
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }

  private parseBearerToken (token: string) {
    return token.replace('Bearer', '').trim()
  }
}

export {
  AuthMiddleware
}
