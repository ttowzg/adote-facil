import { Router } from 'express'
import { createUserControllerInstance } from './controllers/user/create-user.js'
import { userLoginControllerInstance } from './controllers/user/user-login.js'
import { upload } from './config/multer.js'
import { createAnimalControllerInstance } from './controllers/animal/create-animal.js'
import { userAuthMiddlewareInstance } from './middlewares/user-auth.js'
import { getAvailableAnimalsControllerInstance } from './controllers/animal/get-available.js'
import { getUserAnimalsControllerInstance } from './controllers/animal/get-user-animals.js'
import { updateUserControllerInstance } from './controllers/user/update-user.js'
import { updateAnimalStatusControllerInstance } from './controllers/animal/update-animal-status.js'
import { createUserMessageControllerInstance } from './controllers/user-message/create-user-message.js'
import { getUserChatsControllerInstance } from './controllers/user-message/get-user-chats.js'

const router = Router()

// TODO trocar rotas para plural
router.post(
  '/users',
  createUserControllerInstance.handle.bind(createUserControllerInstance),
)

router.patch(
  '/users',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  updateUserControllerInstance.handle.bind(updateUserControllerInstance),
)

router.post(
  '/users/messages',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  createUserMessageControllerInstance.handle.bind(
    createUserMessageControllerInstance,
  ),
)

router.get(
  '/users/messages/chats',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getUserChatsControllerInstance.handle.bind(getUserChatsControllerInstance),
)

router.post(
  '/login',
  userLoginControllerInstance.handle.bind(userLoginControllerInstance),
)

router.post(
  '/animals',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  upload.array('pictures', 5), // Middleware do multer para upload de até 5 arquivos
  createAnimalControllerInstance.handle.bind(createAnimalControllerInstance),
)

router.patch(
  '/animals/:id',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  updateAnimalStatusControllerInstance.handle.bind(
    updateAnimalStatusControllerInstance,
  ),
)

router.get(
  '/animals/available',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getAvailableAnimalsControllerInstance.handle.bind(
    getAvailableAnimalsControllerInstance,
  ),
)

router.get(
  '/animals/user',
  userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
  getUserAnimalsControllerInstance.handle.bind(
    getUserAnimalsControllerInstance,
  ),
)

export { router }
