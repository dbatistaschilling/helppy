
import { Controller } from '../../../presentation/protocols'
import { ModelRepositoryAdapter } from '../../../infra/database/model-repository-adapter'
import { ValidatorAdapter } from '../../../infra/validations/validator-adapter'
import { SignUp } from '../../../data/auth/SignUp'
import { SignUpCtrl } from '../../../presentation/controllers/auth/SignUpCtrl'
import { EncrypterAdapter } from '../../../infra/encryption/encrypter-adapter'

export const makeSignUpFactory = (): Controller => {
  console.log('SIGNUP CONTROLLER')
  const modelRepositoryAdapter = new ModelRepositoryAdapter()
  const encrypter = new EncrypterAdapter()
  const signUp = new SignUp(modelRepositoryAdapter, encrypter)
  const validator = new ValidatorAdapter()
  return new SignUpCtrl(validator, signUp)
}
