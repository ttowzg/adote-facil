import { UserMessage } from '@prisma/client'

export namespace CreateUserMessageRepositoryDTO {
  export type Params = {
    chatId: string
    senderId: string
    content: string
  }

  export type Result = UserMessage
}
