import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createConversation, getConversation } from '../controllers/conversationController.js'

const router = express.Router()

router.route('/').post(protect, createConversation).get(protect, getConversation)


export default router