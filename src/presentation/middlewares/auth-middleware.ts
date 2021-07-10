import { AuctioneerRepository, ParticipantRepository } from '../../infra/typeorm/repositories'
import { Auctioneer, Participant } from '../../domain/entities'
import AuthMiddlewareParams from '../../domain/usecases/auth/auth-middleware-params'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { AccessDeniedError } from '../errors'
import { HttpResponse, Middleware } from '../protocols'

interface GenericUserRepository {
  findByToken(token: string): Promise<any>
}

class TokenAuctioneersRepository implements GenericUserRepository {
  findByToken (token: string): Promise<Auctioneer> {
    const repository = new AuctioneerRepository()
    return repository.findByToken(token)
  }
}

class TokenParticipantsRepository implements GenericUserRepository {
  findByToken (token: string): Promise<Participant> {
    const repository = new ParticipantRepository()
    return repository.findByToken(token)
  }
}

class AuthMiddleware implements Middleware {
  constructor (
    private readonly userType: GenericUserRepository
  ) {
    this.userType = userType
  }

  async handle (request: AuthMiddlewareParams): Promise<HttpResponse> {
    try {
      const { token } = request
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
}

export {
  GenericUserRepository,
  TokenAuctioneersRepository,
  TokenParticipantsRepository,
  AuthMiddleware
}
