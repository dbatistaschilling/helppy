import mongoose from 'mongoose'
import { IDatabase } from '../../utils/database/IDatabase'

class DatabaseConnectionAdapter implements IDatabase {
  async connect (uri: string): Promise<any> {
    return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  async disconnect (): Promise<void> {
    return await mongoose.disconnect()
  }
}

export default new DatabaseConnectionAdapter()
