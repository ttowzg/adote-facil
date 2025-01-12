import { AnimalStatus, PrismaClient } from '@prisma/client'
import { prisma } from '../database.js'
import {
  CreateAnimalRepositoryDTO,
  UpdateAnimalStatusRepositoryDTO,
} from './animal.dto.js'

export class AnimalRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateAnimalRepositoryDTO.Params,
  ): Promise<CreateAnimalRepositoryDTO.Result> {
    return this.repository.animal.create({ data: params })
  }

  async updateStatus({
    id,
    status,
    userId,
  }: UpdateAnimalStatusRepositoryDTO.Params) {
    return this.repository.animal.update({
      where: { id, userId },
      data: { status },
    })
  }

  async findAllAvailableNotFromUser(userId: string) {
    return this.repository.animal.findMany({
      where: { userId: { not: userId }, status: AnimalStatus.available },
      include: { images: true },
    })
  }

  async findAllByUserId(userId: string) {
    return this.repository.animal.findMany({
      where: { userId, status: AnimalStatus.available },
      include: { images: true },
    })
  }
}

export const animalRepositoryInstance = new AnimalRepository(prisma)
