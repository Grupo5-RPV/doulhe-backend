import HttpRequest from './http-request'
import HttpResponse from './http-response'

export default interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
