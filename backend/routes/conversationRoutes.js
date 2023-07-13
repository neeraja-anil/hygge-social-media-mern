import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createConversation, getUserConversations } from '../controllers/conversationController.js'

const router = express.Router()

router.route('/').post(protect, createConversation).get(protect, getUserConversations)


export default router