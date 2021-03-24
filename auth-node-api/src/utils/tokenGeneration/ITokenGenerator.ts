export interface ITokenGeneratorInput {
  id: string
  email: string
}

export interface ITokenOutput {
  accessToken: string
}

export interface ITokenGenerator {
  generate: (tokenGeneratorData: ITokenGeneratorInput) => Promise<ITokenOutput>
}
