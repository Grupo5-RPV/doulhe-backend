import EmailValidatorAdapter from '../../../main/adapters/validators/email-validator-adapter'
import EmailValidation from '../../../presentation/helpers/validation/email-validation'
import RequiredFieldValidation from '../../../presentation/helpers/validation/required-field-validation'
import UndefinedFieldValidation from '../../../presentation/helpers/validation/undefined-field-validation'
import Validation from '../../../presentation/protocols/validation'
import ValidationComposite from '../../../presentation/helpers/validation/validation-composite'

export const CreateParticipantValidationFactory = () : ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'username', 'password', 'email', 'address', 'phone']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new UndefinedFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
