import { Router } from 'express'
import * as UserController from '../controllers/UserController'
import SigninController from '../controllers/SigninController'
import { checkAuthorization } from '../services/Auth'

const route = Router()


// User 
route.get('/user', checkAuthorization, UserController.index)
route.post('/user', checkAuthorization, UserController.create)

route.post('/signin', SigninController.create)

export default route