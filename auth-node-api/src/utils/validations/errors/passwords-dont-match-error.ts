export class PasswordsDontMatchError extends Error {
  constructor () {
    super('Passwords must be equal.')
    this.name = 'PasswordsDontMatchError'
  }
}
