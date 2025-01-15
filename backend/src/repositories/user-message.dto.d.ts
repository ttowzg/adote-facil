import { UserMessage } from '@prisma/client'

export namespace CreateUserMessageRepositoryDTO {
  export type Params = {
    senderId: string
    receiverId: string
    content: string
  }

  export type Result = UserMessage
}
