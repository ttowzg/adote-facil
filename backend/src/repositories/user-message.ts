import { PrismaClient } from '@prisma/client'
import { prisma } from '../database.js'
import { CreateUserMessageRepositoryDTO } from './user-message.dto.js'

export class UserMessageRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(
    data: CreateUserMessageRepositoryDTO.Params,
  ): Promise<CreateUserMessageRepositoryDTO.Result> {
    return this.repository.userMessage.create({ data })
  }
}

export const userMessageRepositoryInstance = new UserMessageRepository(prisma)
