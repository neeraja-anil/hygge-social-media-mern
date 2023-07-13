import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { addMessage, getMessages } from '../controllers/messageControllers.js'

const router = express.Router()

router.route('/').post(protect, addMessage)
router.route('/:conversationId').get(protect, getMessages)


export default router