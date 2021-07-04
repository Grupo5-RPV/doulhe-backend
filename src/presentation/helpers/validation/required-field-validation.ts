import MissingParamError from '../../errors/missing-param-error'
import Validation from 'src/presentation/protocols/validation'

export default class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
