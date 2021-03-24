import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { IValidator } from "../../../utils/validations/IValidator"
import { badRequest, serverError, ok } from "../../helpers/http-helper"
import { ISignUp } from "../../../domain/usecases/ISignUp"

export class SignUpCtrl implements Controller {
  constructor (
    private readonly validator: IValidator,
    private readonly signup: ISignUp
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiresResult = this.validator.requires(httpRequest.body, ['name', 'email', 'password', 'passwordToCompare'])
      if (requiresResult) {
        return badRequest(requiresResult)
      }
      const isValidResult = this.validator.isValid(httpRequest.body.email)
      if (isValidResult) {
        return badRequest(isValidResult)
      }
      const passwordMatchResult = this.validator.passwordMatch(httpRequest.body.password, httpRequest.body.passwordToCompare)
      if (passwordMatchResult) {
        return badRequest(passwordMatchResult)
      }
      const signUpResult = await this.signup.execute(httpRequest.body)
      if (signUpResult.error) {
        return badRequest(signUpResult.body)
      }
      return ok({ message: 'SignUp with success', user: signUpResult.body })
    } catch (error) {
      return serverError(error)
    }
  }
}
