import express from 'express'
import { login, logout, register, getUser } from '../controller/userController.js'
import { isAuth } from "../middleware/auth.js"


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', isAuth, logout)
router.get('/getuser', isAuth, getUser)

export default router