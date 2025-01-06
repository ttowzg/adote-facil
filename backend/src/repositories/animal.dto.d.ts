import { Animal } from '@prisma/client'

export namespace CreateAnimalRepositoryDTO {
  export type Params = {
    name: string
    type: string
    gender: 'macho' | 'femea'
    race?: string
    description?: string
    userId: string
  }

  export type Result = Animal
}
