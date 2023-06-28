import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/userController.js'

const router = express.Router()

//READ
router.route('/:id').get(protect, getUser)
router.route('/:id/friends').get(protect, getUserFriends)

//UPDATE
router.route('/:id/addfriend').put(protect, addRemoveFriend)


export default router