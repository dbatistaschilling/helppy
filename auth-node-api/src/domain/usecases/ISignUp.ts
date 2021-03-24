export interface ISignUpInput {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface ISignUpOutput {
  error: boolean
  body: any
}

export interface ISignUp {
  execute: (signupData: ISignUpInput) => Promise<ISignUpOutput>
}
