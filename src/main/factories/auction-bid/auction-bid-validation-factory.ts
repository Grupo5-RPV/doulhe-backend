import RequiredFieldValidation from '../../../presentation/helpers/validation/required-field-validation'
import UndefinedFieldValidation from '../../../presentation/helpers/validation/undefined-field-validation'
import ValidationComposite from '../../../presentation/helpers/validation/validation-composite'
import Validation from '../../../presentation/protocols/validation'

export const createAuctionBidValidationFactory = () : ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['timestamp', 'value', 'auctionItemId', 'participantId']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new UndefinedFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
