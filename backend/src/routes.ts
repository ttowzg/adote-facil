import { Router } from 'express'
import { createUserControllerInstance } from './controllers/user/create-user.js'

const router = Router()

router.post(
  '/user',
  createUserControllerInstance.handle.bind(createUserControllerInstance),
)

export { router }
