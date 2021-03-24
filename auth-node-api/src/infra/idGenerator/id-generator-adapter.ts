import { IIdGenerator } from "../../utils/idGenerator/IIdGenerator"
import { uuid } from 'uuidv4'

export class IdGeneratorAdapter implements IIdGenerator {
  generate (): string {
    return uuid()
  }
}
