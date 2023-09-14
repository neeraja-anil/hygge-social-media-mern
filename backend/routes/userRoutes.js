import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { getUser, getAllUsers, getUserFriends, addRemoveFriend, updateUser, updatePassword, getUnseenNotifications, getSeenNotifications, markAsRead } from '../controllers/userController.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

//READ
router.route('/').get(protect, getAllUsers)
router.route('/:id').get(protect, getUser)
router.route('/:id/friends').get(protect, getUserFriends)
router.route('/:id/notifications/unseen').get(protect, getUnseenNotifications)
router.route('/:id/notifications/seen').get(protect, getSeenNotifications)
router.route('/:id/notifications/:notificationId').patch(protect, markAsRead)

//UPDATE
router.route('/profile/edit').put(protect, upload.single('avatar'), updateUser)
router.route('/changePassword').patch(protect, updatePassword)
router.route('/:id/addfriend').put(protect, addRemoveFriend)



export default router