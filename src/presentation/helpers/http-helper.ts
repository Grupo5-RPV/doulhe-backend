import HttpResponse from '../../presentation/protocols/http-response'
import UnauthorizedError from '../../presentation/errors/unauthorized-error'
import ServerError from '../../presentation/errors/server-error'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (data: any): HttpResponse => ({
  statusCode: 403,
  body: data
})

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: data
})

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
