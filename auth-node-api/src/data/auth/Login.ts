import { ILogin, ILoginInput, ILoginOutput } from "../../domain/usecases/ILogin"
import { IModelRepository } from "../../utils/database/IModelRepository"
import { CollectionNotFoundError } from "../../utils/database/errors/Collection-not-found-error"
import { IEncrypter } from "../../utils/encryption/IEncrypter"
import { WrongCredentialsError } from "../../utils/encryption/errors/wrong-credentials-error"
import { ITokenGenerator } from "../../utils/tokenGeneration/ITokenGenerator"

export class Login implements ILogin {
  constructor (
    private readonly userRepository: IModelRepository,
    private readonly encrypter: IEncrypter,
    private readonly tokenGenerator: ITokenGenerator
  ) {}

  async execute (loginInput: ILoginInput): Promise<ILoginOutput> {
    const { email, password } = loginInput
    const user = await this.userRepository.findOne('User', { email })
    if (!user) {
      return {
        error: true,
        body: new CollectionNotFoundError('User')
      }
    }
    const compareResult = await this.encrypter.compare({ password: user.password, passwordToCompare: password })
    if (!compareResult) {
      return {
        error: true,
        body: new WrongCredentialsError('User')
      }
    }
    const accessToken = await this.tokenGenerator.generate({ id: user.id, email: user.email })
    console.log(accessToken)
    return {
      error: false,
      body: { user, accessToken }
    }
  }
}
