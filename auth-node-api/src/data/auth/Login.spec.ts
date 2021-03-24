import { Login } from './Login'
import { IModelRepository } from '../../utils/database/IModelRepository'
import { ILoginInput } from '../../domain/usecases/ILogin'
import { CollectionNotFoundError } from '../../utils/database/errors/Collection-not-found-error'
import { IEncrypter, IEncrypterOutput, IDcrypterInput } from '../../utils/encryption/IEncrypter'
import { WrongCredentialsError } from '../../utils/encryption/errors/wrong-credentials-error'
import { ITokenGenerator, ITokenGeneratorInput, ITokenOutput } from '../../utils/tokenGeneration/ITokenGenerator'
import { IUser } from '../../domain/models/User/IUser'

const makeFakeUser = (): IUser => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeInputData = (): ILoginInput => ({
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeEncrypterInput = (): IDcrypterInput => ({
  password: 'valid_password',
  passwordToCompare: 'valid_password'
})

const makeFakeTokenGeneratorInput = (): ITokenGeneratorInput => ({
  id: 'valid_id',
  email: 'valid_email@mail.com',
  secret: 'valid_secret',
  expireTime: 'valid_expire_time'
})

const makeModelRepository = (): IModelRepository => {
  class DatabaseModelStub implements IModelRepository {
    map (collections: any[]): any[] {
      return collections
    }

    async findById (collectionName: string, id: string): Promise<Object> {
      return new Promise(resolve => resolve(null))
    }

    async findOne (collectionName: string, collectionParams: Object): Promise<Object> {
      return new Promise(resolve => resolve(makeFakeUser()))
    }

    async find (collectionName: string, collectionParams: Object, returnFilters: Object): Promise<Object[]> {
      const users = []
      const user = makeFakeUser()
      users.push(user)
      return new Promise(resolve => resolve(users))
    }

    async updateOne (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object): Promise<Object> {
      return new Promise(resolve => resolve(null))
    }

    async updateMany (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object): Promise<Object[]> {
      return new Promise(resolve => resolve(null))
    }

    async deleteOne (collectionName: string, collectionParams: Object): Promise<Object> {
      return new Promise(resolve => resolve(null))
    }

    async deleteMany (collectionName: string, collectionParams: Object): Promise<Object[]> {
      return new Promise(resolve => resolve(null))
    }

    async save (collectionName: string, collectionInstance: Object): Promise<Object> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new DatabaseModelStub()
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (password: string): Promise<IEncrypterOutput> {
      return new Promise(resolve => resolve({ hashedPassword: 'valid_hashed_password' }))
    }

    async compare (dcryptData: IDcrypterInput): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new EncrypterStub()
}

const makeTokenGenerator = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator {
    async generate (tokenGeneratorData: ITokenGeneratorInput): Promise<ITokenOutput> {
      return new Promise(resolve => resolve({ accessToken: 'valid_access_token' }))
    }
  }

  return new TokenGeneratorStub()
}

interface SutTypes {
  sut: Login
  modelRepositoryStub: IModelRepository
  encrypterStub: IEncrypter
  tokenGeneratorStub: ITokenGenerator
}

const makeSut = (): SutTypes => {
  const modelRepositoryStub = makeModelRepository()
  const encrypterStub = makeEncrypter()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new Login(modelRepositoryStub, encrypterStub, tokenGeneratorStub)
  return {
    sut,
    modelRepositoryStub,
    encrypterStub,
    tokenGeneratorStub
  }
}

describe('Login', () => {
  test('should call ModelRepository findOne with correct values', async () => {
    const { sut, modelRepositoryStub } = makeSut()
    const findOneSpy = jest.spyOn(modelRepositoryStub, 'findOne')
    await sut.execute(makeFakeInputData())
    expect(findOneSpy).toHaveBeenCalledWith('User', { email: 'valid_email@mail.com' })
  })

  test('should throw CollectionNotFoundError if no user is found', async () => {
    const { sut, modelRepositoryStub } = makeSut()
    jest.spyOn(modelRepositoryStub, 'findOne').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => resolve(null))
    })
    const sutResult = await sut.execute(makeFakeInputData())
    expect(sutResult).toEqual(new CollectionNotFoundError('User'))
  })

  test('should call Encrypter compare with correct values', async () => {
    const { sut, encrypterStub } = makeSut()
    const compareSpy = jest.spyOn(encrypterStub, 'compare')
    await sut.execute(makeFakeInputData())
    expect(compareSpy).toHaveBeenCalledWith(makeFakeEncrypterInput())
  })

  test('should throw WrongCredentialsError if passwords don\'t match', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'compare').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => resolve(false))
    })
    const sutResult = await sut.execute(makeFakeInputData())
    expect(sutResult).toEqual(new WrongCredentialsError('User'))
  })

  test('should call TokenGenerator with correct values', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.execute(makeFakeInputData())
    expect(generateSpy).toHaveBeenCalledWith(makeFakeTokenGeneratorInput())
  })

  test('should return an user and an accessToken if valid data is provided', async () => {
    const { sut } = makeSut()
    const sutResult = await sut.execute(makeFakeInputData())
    expect(sutResult).toEqual({
      user: makeFakeUser(),
      accessToken: 'valid_access_token'
    })
  })
})
