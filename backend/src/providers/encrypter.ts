import bcrypt from 'bcrypt'

export class Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }
}

export const encrypterInstance = new Encrypter()
