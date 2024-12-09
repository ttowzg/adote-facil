import { PrismaClient } from '@prisma/client'
import { prisma } from '../database.js'
import {
  CreateAnimalRepositoryDTO,
  FindAllAnimalsRepositoryDTO,
} from './animal.dto.js'

export class AnimalRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateAnimalRepositoryDTO.Params,
  ): Promise<CreateAnimalRepositoryDTO.Result> {
    return this.repository.animal.create({ data: params })
  }

  async findAll(
    params: FindAllAnimalsRepositoryDTO.Params,
  ): Promise<FindAllAnimalsRepositoryDTO.Result> {
    return this.repository.animal.findMany({
      where: { userId: { not: params.userId } },
      include: { images: true },
    })
  }
}

export const animalRepositoryInstance = new AnimalRepository(prisma)
