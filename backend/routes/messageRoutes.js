import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { addMessage, deleteAllMessages, getMessages } from '../controllers/messageControllers.js'

const router = express.Router()

router.route('/').post(protect, addMessage)
router.route('/delete/:conversationId').delete(protect, deleteAllMessages)
router.route('/:conversationId').get(protect, getMessages)


export default router