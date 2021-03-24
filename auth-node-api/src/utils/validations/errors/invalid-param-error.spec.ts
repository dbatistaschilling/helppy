import { InvalidParamError } from "./invalid-param-error"

describe('Invalid param error', () => {
  test('should ', () => {
    const sut = new InvalidParamError('email')
    expect(sut.message).toEqual('Invalid param: email')
  })
})
