import { MissingParamError } from "./missing-param-error"

describe('Invalid param error', () => {
  test('should ', () => {
    const sut = new MissingParamError('email')
    expect(sut.message).toEqual('Missing param: email')
  })
})
