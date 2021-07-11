export default interface UserRepository<T> {
  findById (id: string): Promise<T>
  findByToken (token: string): Promise<T>
  findByEmail (email: string): Promise<T>
  updateToken (token: string, id: string): Promise<void>
}
