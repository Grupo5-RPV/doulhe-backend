import Validation from '../../../presentation/protocols/validation'
import InvalidParamError from '../../errors/invalid-param-error'

export class TimestampValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {
    this.fieldName = fieldName
  }

  private isNumeric (input: any) {
    return !isNaN(parseFloat(input)) && isFinite(input)
  }

  validate (input: any): Error {
    const newTimestamp = new Date(input).getTime()
    if (!this.isNumeric(newTimestamp)) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
