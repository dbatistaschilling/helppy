export interface IModelRepository{
  repositoryResponse: (_doc: any) => any
  findById: (collectionName: string, id: string) => Promise<any>
  findOne: (collectionName: string, collectionParams: Object) => Promise<any>
  find: (collectionName: string, collectionParams: Object, returnFilters: Object) => Promise<any>
  updateOne: (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object) => Promise<any>
  updateMany: (collectionName: string, collectionParams: Object, collectionUpdatedParams: Object) => Promise<any>
  deleteOne: (collectionName: string, collectionParams: Object) => Promise<any>
  deleteMany: (collectionName: string, collectionParams: Object) => Promise<any>
  save: (collectionName: string, collectionInstance: Object) => Promise<any>
}
