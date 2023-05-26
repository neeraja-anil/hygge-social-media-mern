import express from 'express'
import { registerNewUser, verifyNewUser, authUser } from '../controllers/AuthUserController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', registerNewUser)
router.post('/verify', verifyNewUser)
router.post('/login', authUser)

export default router