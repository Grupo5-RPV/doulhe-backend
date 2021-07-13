import UndefinedFieldValidation from '../../../presentation/helpers/validation/undefined-field-validation'
import RequiredFieldValidation from '../../../presentation/helpers/validation/required-field-validation'
import ValidationComposite from '../../../presentation/helpers/validation/validation-composite'
import Validation from '../../../presentation/protocols/validation'

export const CreateAuctionItemValidationFactory = () : ValidationComposite => {
  const validations : Validation[] = []
  for (const field of ['title', 'description', 'minimumBid', 'imagePath', 'categoryId', 'itemProviderId']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new UndefinedFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
