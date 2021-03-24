export class CollectionNotFoundError extends Error {
  constructor (paramName: string) {
    super(`${paramName} not found.`)
    this.name = 'CollectionNotFoundError'
  }
}
