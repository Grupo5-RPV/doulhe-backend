import { Encrypter, HashComparer } from '../../../data/protocols/cryptography'
import { InvalidParamError, MissingParamError } from '../../../presentation/errors'
import { UserRepository } from '../../../data/protocols/db'
import { UseCase } from '../../../presentation/protocols'
import AuthParams from './auth-params'

export default class AuthUseCase implements UseCase {
  constructor (
    private readonly repository: UserRepository<any>,
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer
  ) {
    this.repository = repository
    this.encrypter = encrypter
    this.hashComparer = hashComparer
  }

  async execute (data: AuthParams) {
    const user = await this.findUser(data.email)
    await this.checkPassword(data.password, user.password)
    const token = this.generateNewToken(user.id)
    this.saveToken(token, user.id)
    return token
  }

  private async findUser (email: string): Promise<any> {
    const user = await this.repository.findByEmail(email)
    if (!user) {
      throw new MissingParamError('O usuário não existe')
    }
    return user
  }

  private async checkPassword (attemptedPassword: string, realPassword: string): Promise<void> {
    const isValidPassword = await this.hashComparer.compare(attemptedPassword, realPassword)

    if (!isValidPassword) {
      throw new InvalidParamError('Senhas não coincidem')
    }
  }

  private generateNewToken (userId: string) {
    return this.encrypter.encrypt(userId)
  }

  private async saveToken (token: string, id: string) {
    await this.repository.updateToken(token, id)
  }
}
