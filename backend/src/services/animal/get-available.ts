import { Animal } from '@prisma/client'
import { Either, Success } from '../../utils/either.js'
import {
  AnimalRepository,
  animalRepositoryInstance,
} from '../../repositories/animal.js'
import {
  AnimalImageRepository,
  animalImageRepositoryInstance,
} from '../../repositories/animal-image.js'

namespace GetAvailableAnimalsDTO {
  export type Params = {
    userId: string
  }

  export type Failure = { message: string }

  export type Success = { animals: Animal[] }

  export type Result = Either<Failure, Success>
}

export class GetAvailableAnimalsService {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalImageRepository: AnimalImageRepository,
  ) {}

  async execute(
    params: GetAvailableAnimalsDTO.Params,
  ): Promise<GetAvailableAnimalsDTO.Result> {
    const { userId } = params

    const animals = await this.animalRepository.findAll({ userId })

    const formattedAnimals = animals.map((animal) => {
      return {
        ...animal,
        images: animal.images.map((image) => {
          return Buffer.from(image.imageData).toString('base64')
        }),
      }
    })

    return Success.create({ animals: formattedAnimals })
  }
}

export const getAvailableAnimalsServiceInstance =
  new GetAvailableAnimalsService(
    animalRepositoryInstance,
    animalImageRepositoryInstance,
  )
