import { LoginCtrl } from "./LoginCtrl"
import { ILoginInput, ILogin, ILoginOutput } from "../../../domain/usecases/ILogin"
import { HttpRequest } from "../../protocols"
import { IValidator } from "../../../utils/validations/IValidator"
import { badRequest, serverError, ok } from "../../helpers/http-helper"
import { IUser } from "../../../domain/models/User/IUser"
import { MissingParamError } from "../../../utils/validations/errors/missing-param-error"

const makeFakeUser = (): IUser => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeInputData = (): ILoginInput => ({
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeHttpRequest = (): HttpRequest => ({
  body: makeFakeInputData()
})

const makeFakeLoginOutput = (): ILoginOutput => ({
  error: false,
  body: {
    user: makeFakeUser(),
    accessToken: 'valid_access_token'
  }
})

const makeValidatorStub = (): IValidator => {
  class ValidatorStub implements IValidator {
    requires (data: Object, requiredFields: string[]): any {
      return false
    }
  }

  return new ValidatorStub()
}

const makeLogin = (): ILogin => {
  class LoginStub implements ILogin {
    async execute (loginData: ILoginInput): Promise<ILoginOutput> {
      return new Promise(resolve => resolve({
        error: false,
        body: {
          user: makeFakeUser(),
          accessToken: 'valid_access_token'
        }
      }))
    }
  }

  return new LoginStub()
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const loginStub = makeLogin()
  const sut = new LoginCtrl(validatorStub, loginStub)
  return {
    sut,
    validatorStub,
    loginStub
  }
}

interface SutTypes {
  sut: LoginCtrl
  validatorStub: IValidator
  loginStub: ILogin
}

describe('LoginCtrl', () => {
  test('should call handle with correct values', async () => {
    const { sut } = makeSut()
    const handleSpy = jest.spyOn(sut, 'handle')
    await sut.handle(makeFakeHttpRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeHttpRequest())
  })

  test('should call validate with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'requires')
    await sut.handle(makeFakeHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith({ email: 'valid_email@mail.com', password: 'valid_password' }, ['email', 'password'])
  })

  test('should return 400 if validations returns false', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'requires').mockReturnValueOnce(new MissingParamError('email'))
    const sutResult = await sut.handle({
      body: {
        password: 'invalid_password',
        secret: 'invalid_secret',
        expireTime: 'invalid_expire_time'
      }
    })
    expect(sutResult).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should call Login execute with correct values', async () => {
    const { sut, loginStub } = makeSut()
    const executeSpy = jest.spyOn(loginStub, 'execute')
    await sut.handle(makeFakeHttpRequest())
    expect(executeSpy).toHaveBeenCalledWith(makeFakeInputData())
  })

  test('should throw if Login throws', async () => {
    const { sut, loginStub } = makeSut()
    jest.spyOn(loginStub, 'execute').mockImplementationOnce(async () => {
      throw Error()
    })
    const sutResult = await sut.handle(makeFakeHttpRequest())
    expect(sutResult).toEqual(serverError(new Error()))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakeLoginOutput().body))
  })
})
