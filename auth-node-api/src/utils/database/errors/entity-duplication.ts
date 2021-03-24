export class EntityDuplicationError extends Error {
  constructor (paramName: string) {
    super(`${paramName} already exists.`)
    this.name = 'EntityDuplicationError'
  }
}
