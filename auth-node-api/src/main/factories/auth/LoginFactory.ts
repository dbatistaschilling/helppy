import { LoginCtrl } from '../../../presentation/controllers/auth/LoginCtrl'
import { Controller } from '../../../presentation/protocols'
import { Login } from '../../../data/auth/Login'
import { EncrypterAdapter } from '../../../infra/encryption/encrypter-adapter'
import { TokenGeneratorAdapter } from '../../../infra/tokenGeneration/token-generator-adapter'
import { ModelRepositoryAdapter } from '../../../infra/database/model-repository-adapter'
import { ValidatorAdapter } from '../../../infra/validations/validator-adapter'

export const makeLoginFactory = (): Controller => {
  console.log('LOGIN CONTROLLER')

  const modelRepositoryAdapter = new ModelRepositoryAdapter()
  const encrypterAdapter = new EncrypterAdapter()
  const tokenGeneratorAdapter = new TokenGeneratorAdapter()
  const login = new Login(modelRepositoryAdapter, encrypterAdapter, tokenGeneratorAdapter)
  const validator = new ValidatorAdapter()
  return new LoginCtrl(validator, login)
}
