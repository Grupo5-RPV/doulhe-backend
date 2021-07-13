import { Category } from '../../../domain/entities'

export default interface ICategoryRepository {
  findById(id: string): Promise<Category>
}
