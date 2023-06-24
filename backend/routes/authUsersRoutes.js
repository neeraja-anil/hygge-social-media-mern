import express from 'express'
import { registerNewUser, verifyNewUser, authUser } from '../controllers/AuthUserController.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.post('/', registerNewUser)
router.post('/verify', upload.single('avatar'), verifyNewUser)
router.post('/login', authUser)

export default router