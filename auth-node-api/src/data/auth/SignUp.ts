import { ISignUp, ISignUpInput, ISignUpOutput } from "../../domain/usecases/ISignUp"
import { IModelRepository } from "../../utils/database/IModelRepository"
import { EntityDuplicationError } from "../../utils/database/errors/entity-duplication"
import { IEncrypter } from "../../utils/encryption/IEncrypter"

export class SignUp implements ISignUp {
  constructor (
    private readonly userRepository: IModelRepository,
    private readonly encrypter: IEncrypter
  ) {}

  async execute (signupInput: ISignUpInput): Promise<ISignUpOutput> {
    const { name, email, password } = signupInput
    const user = await this.userRepository.findOne('User', { email })
    console.log(user)
    if (user) {
      return {
        error: true,
        body: new EntityDuplicationError('User')
      }
    }
    const { hashedPassword } = await this.encrypter.encrypt(password)
    const signUpResult = await this.userRepository.save('User', { name, email, password: hashedPassword })
    return {
      error: false,
      body: signUpResult
    }
  }
}
