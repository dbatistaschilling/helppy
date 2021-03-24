export interface IValidator {
  requires: (data: Object, requiredFields: string[]) => any
  isValid: (email: string) => any
  passwordMatch: (password: string, passwordToCompare: string) => any
}
