import { IValidator } from "../../utils/validations/IValidator"
import { MissingParamError } from "../../utils/validations/errors/missing-param-error"
import { PasswordsDontMatchError } from "../../utils/validations/errors/passwords-dont-match-error"
import validator from 'validator'
import { InvalidParamError } from "../../utils/validations/errors/invalid-param-error"

export class ValidatorAdapter implements IValidator {
  requires (data: Object, requiredFields: string[]): any {
    const dataSent = Object.keys(data)
    if (dataSent.length === 0) {
      const fields = requiredFields.join(', ')
      return new MissingParamError(fields)
    }
    for (const value of requiredFields) {
      if (!dataSent.includes(value)) {
        return new MissingParamError(value)
      }
    }
  }

  isValid (email: string): any {
    if (!validator.isEmail(email)) {
      return new InvalidParamError('Email')
    }
  }

  passwordMatch (password: string, passwordToCompare: string): any {
    if (password !== passwordToCompare) {
      return new PasswordsDontMatchError()
    }
  }
}
