import { PrismaClient } from '@prisma/client'
import { prisma } from '../../database.js'
import { CreateUserRepositoryDTO } from './dto.js'

export class UserRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    params: CreateUserRepositoryDTO.Params,
  ): Promise<CreateUserRepositoryDTO.Result> {
    return this.repository.user.create({ data: params })
  }

  async findByEmail(email: string) {
    return this.repository.user.findUnique({ where: { email } })
  }
}

export const userRepositoryInstance = new UserRepository(prisma)
