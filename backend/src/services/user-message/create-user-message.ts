import { UserMessage } from '@prisma/client'

import {
  UserMessageRepository,
  userMessageRepositoryInstance,
} from '../../repositories/user-message.js'

namespace CreateUserMessageDTO {
  export type Params = {
    senderId: string
    receiverId: string
    content: string
  }

  export type Result = UserMessage
}

export class CreateUserMessageService {
  constructor(private readonly userMessageRepository: UserMessageRepository) {}

  async execute(
    params: CreateUserMessageDTO.Params,
  ): Promise<CreateUserMessageDTO.Result> {
    const { senderId, receiverId, content } = params

    const message = await this.userMessageRepository.create({
      senderId,
      receiverId,
      content,
    })

    return message
  }
}

export const createUserMessageServiceInstance = new CreateUserMessageService(
  userMessageRepositoryInstance,
)
