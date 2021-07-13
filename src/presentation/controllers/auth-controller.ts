import AuthUseCase from '../../domain/usecases/auth/auth-use-case'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, notFound, ok, serverError } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export default class AuthController implements Controller {
  constructor (
    private authUseCase: AuthUseCase
  ) {
    this.authUseCase = authUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const token: string = await this.authUseCase.execute({
        email, password
      })

      return ok(token)
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      if (error instanceof MissingParamError) {
        return notFound(error)
      }
      return serverError(error)
    }
  }
}
