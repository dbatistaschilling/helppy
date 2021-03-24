export class WrongCredentialsError extends Error {
  constructor (paramName: string) {
    super(`${paramName}: wrong credentials`)
    this.name = 'WrongCredentialsError'
  }
}
