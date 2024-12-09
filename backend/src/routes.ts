import { Router } from 'express'
import { createUserControllerInstance } from './controllers/user/create-user.js'
import { userLoginControllerInstance } from './controllers/user/user-login.js'
import { upload } from './config/multer.js'
import { createAnimalControllerInstance } from './controllers/animal/create-animal.js'
import { userAuthMiddlewareInstance } from './middlewares/user-auth.js'
import { getAvailableAnimalsControllerInstance } from './controllers/animal/get-available.js'

const router = Router()

router.post(
  '/user',
  createUserControllerInstance.handle.bind(createUserControllerInstance),
)

router.post(
  '/login',
  userLoginControllerInstance.handle.bind(userLoginControllerInstance),
)

router.post(
  '/animal',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  upload.array('pictures', 5), // Middleware do multer para upload de até 5 arquivos
  createAnimalControllerInstance.handle.bind(createAnimalControllerInstance),
)

router.get(
  '/animals/available',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getAvailableAnimalsControllerInstance.handle.bind(
    getAvailableAnimalsControllerInstance,
  ),
)

export { router }
