import UndefinedFieldValidation from '../../../presentation/helpers/validation/undefined-field-validation'
import RequiredFieldValidation from '../../../presentation/helpers/validation/required-field-validation'
import ValidationComposite from '../../../presentation/helpers/validation/validation-composite'
import Validation from '../../../presentation/protocols/validation'

export const CreateAuctionValidationFactory = () : ValidationComposite => {
  const validations : Validation[] = []
  for (const field of ['start', 'auctionItems']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new UndefinedFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
