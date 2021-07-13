import CreateParticipant from '../../domain/usecases/participant/create-participant'
import InvalidParamError from '../errors/invalid-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import Controller from '../protocols/controller'
import httpRequest from '../protocols/http-request'
import httpResponse from '../protocols/http-response'
import Validation from '../protocols/validation'

export default class CreateParticipantController implements Controller {
  constructor (
        private validator: Validation,
        private createParticipant: CreateParticipant
  ) {
    this.validator = validator
    this.createParticipant = createParticipant
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { id, name, username, password, email, address, phone, token } = httpRequest.body
      const participant = await this.createParticipant.create({
        id,
        name,
        username,
        password,
        email,
        address,
        phone,
        token
      })
      return ok(participant)
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
