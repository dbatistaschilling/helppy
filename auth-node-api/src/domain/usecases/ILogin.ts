export interface ILoginInput {
  email: string
  password: string

}

export interface ILoginOutput {
  error: boolean
  body: any
}

export interface ILogin {
  execute: (loginData: ILoginInput) => Promise<ILoginOutput>
}
