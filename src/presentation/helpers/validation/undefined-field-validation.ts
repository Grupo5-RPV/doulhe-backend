import InvalidParamError from '../../errors/invalid-param-error'
import Validation from '../../protocols/validation'

export default class UndefinedFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (input == null) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
