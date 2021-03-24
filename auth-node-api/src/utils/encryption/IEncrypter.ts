export interface IDcrypterInput {
  password: string
  passwordToCompare: string
}

export interface IEncrypterOutput {
  hashedPassword: string
}

export interface IEncrypter {
  encrypt: (password: string) => Promise<IEncrypterOutput>
  compare: (dcryptData: IDcrypterInput) => Promise<boolean>
}
