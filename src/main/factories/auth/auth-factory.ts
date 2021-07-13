import { BcryptHashComparerAdapter, JwtAdapter } from '../../../infra/cryptography'
import { UserRepository } from '../../../data/protocols/db'
import AuthTemplate from '../../../domain/usecases/auth/auth-use-case'
import AuthController from '../../../presentation/controllers/auth-controller'
import { Controller } from '../../../presentation/protocols'

export const authFactory = (repository: UserRepository<any>): Controller => {
  const bcryptHashComparerAdapter = new BcryptHashComparerAdapter()
  const jwtAdapter = new JwtAdapter('SECRET')
  const authUseCase = new AuthTemplate(repository, jwtAdapter, bcryptHashComparerAdapter)
  return new AuthController(authUseCase)
}
