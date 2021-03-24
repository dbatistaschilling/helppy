import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { IValidator } from "../../../utils/validations/IValidator"
import { badRequest, serverError, ok } from "../../helpers/http-helper"
import { ILogin } from "../../../domain/usecases/ILogin"

export class LoginCtrl implements Controller {
  constructor (
    private readonly validator: IValidator,
    private readonly login: ILogin
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiresResult = this.validator.requires({ email, password }, ['email', 'password'])
      if (requiresResult) {
        return badRequest(requiresResult)
      }
      const loginResult = await this.login.execute(httpRequest.body)
      if (loginResult.error) {
        return badRequest(loginResult.body)
      }
      return ok({ message: 'Logged with success', body: loginResult.body })
    } catch (error) {
      return serverError(error)
    }
  }
}
