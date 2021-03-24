import { IModelRepository } from "../../utils/database/IModelRepository"

export class ModelRepositoryAdapter implements IModelRepository {
  repositoryResponse (_doc: any): any {
    if (_doc) {
      _doc.id = _doc._id
      delete _doc._id
      return _doc
    } else {
      return false
    }
  }

  async findById (collectionName: string, id: string): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.findById(id)
    return this.repositoryResponse(_doc)
  }

  async findOne (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.findOne(collectionParams)
    return this.repositoryResponse(_doc)
  }

  async find (collectionName: string, collectionParams: Object, returnFilters: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.find(collectionParams, returnFilters, { autopopulate: true })
    return this.repositoryResponse(_doc)
  }

  async updateOne (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.updateOne(collectionParams, collectionUpdatedParams)
    return this.repositoryResponse(_doc)
  }

  async updateMany (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.updateMany(collectionParams, collectionUpdatedParams)
    return this.repositoryResponse(_doc)
  }

  async deleteOne (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.deleteOne(collectionParams)
    return this.repositoryResponse(_doc)
  }

  async deleteMany (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const { _doc } = await CollectionModel.deleteMany(collectionParams)
    return this.repositoryResponse(_doc)
  }

  async save (collectionName: string, collectionParams: Object): Promise<any> {
    const CollectionModel = (await import(`./schemas/${collectionName}Schema`)).default
    const newCollection = new CollectionModel(collectionParams)
    const { _doc } = await newCollection.save()
    return this.repositoryResponse(_doc)
  }
}
