import { ITokenGenerator, ITokenGeneratorInput, ITokenOutput } from "../../utils/tokenGeneration/ITokenGenerator"
import jwt from 'jsonwebtoken'
import env from "../../main/config/env"

export class TokenGeneratorAdapter implements ITokenGenerator {
  async generate (tokenGeneratorData: ITokenGeneratorInput): Promise<ITokenOutput> {
    const { id, email } = tokenGeneratorData
    return await jwt.sign({
      email,
      id
    },
    env.secret,
    { expiresIn: '1h' })
  }
}
