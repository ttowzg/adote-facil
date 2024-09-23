import { Router } from 'express'
import { createUserControllerInstance } from './controllers/user/create-user.js'
import { userLoginControllerInstance } from './controllers/user/user-login.js'

const router = Router()

router.post(
  '/user',
  createUserControllerInstance.handle.bind(createUserControllerInstance),
)

router.post(
  '/login',
  userLoginControllerInstance.handle.bind(userLoginControllerInstance),
)

export { router }
