import { IEncrypter, IEncrypterOutput, IDcrypterInput } from "../../utils/encryption/IEncrypter"
import bcrypt from 'bcrypt'

export class EncrypterAdapter implements IEncrypter {
  async encrypt (password: string): Promise<IEncrypterOutput> {
    const hashedPassword = await bcrypt.hash(password, 12)
    return { hashedPassword }
  }

  async compare (dcryptData: IDcrypterInput): Promise<boolean> {
    const { password, passwordToCompare } = dcryptData
    const compareResult = await bcrypt.compare(passwordToCompare, password)
    return compareResult
  }
}
