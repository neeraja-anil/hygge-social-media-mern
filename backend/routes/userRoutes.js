import express from 'express'
import { registerNewUser, authUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/', registerNewUser)
router.post('/login', authUser)

export default router