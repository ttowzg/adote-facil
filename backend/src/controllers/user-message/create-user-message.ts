import { Request, Response } from 'express'
import {
  CreateUserMessageService,
  createUserMessageServiceInstance,
} from '../../services/user-message/create-user-message.js'

class CreateUserMessageController {
  constructor(private readonly createUserMessage: CreateUserMessageService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { receiverId, content } = request.body
    const { user } = request

    try {
      const result = await this.createUserMessage.execute({
        senderId: user?.id || '',
        receiverId,
        content,
      })

      return response.status(201).json(result)
    } catch (err) {
      const error = err as Error
      console.log({ error })
      return response.status(500).json({ error: error.message })
    }
  }
}

export const createUserMessageControllerInstance =
  new CreateUserMessageController(createUserMessageServiceInstance)
