import HttpResponse from './http-response'

export default interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
