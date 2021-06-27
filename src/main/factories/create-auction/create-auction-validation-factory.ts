import RequiredFieldValidation from "../../../presentation/helpers/validators/required-field-validation";
import ValidationComposite from "../../../presentation/helpers/validators/validation-composite";
import Validation from "../../../presentation/protocols/validation";

export const CreateAuctionValidationFactory = () : ValidationComposite => {
    const validations : Validation[] = []
    for(const field of ['start','auctionItems']){
        validations.push(new RequiredFieldValidation(field))

    }
    return new ValidationComposite(validations)
}