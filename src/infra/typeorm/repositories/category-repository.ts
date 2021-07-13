import ICategoryRepository from '../../../data/protocols/db/category-repository'
import { Category } from '../../../domain/entities'
import { getRepository } from 'typeorm'

export default class CategoryRepository implements ICategoryRepository {
  findById (id: string): Promise<Category> {
    return getRepository(Category).findOne({ id: id })
  }
}
