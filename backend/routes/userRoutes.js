import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { getUser, getUserFriends, addRemoveFriend, updateUser, updatePassword } from '../controllers/userController.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

//READ
router.route('/:id').get(protect, getUser)
router.route('/:id/friends').get(protect, getUserFriends)

//UPDATE
router.route('/profile/edit').put(protect, upload.single('avatar'), updateUser)
router.route('/changePassword').patch(protect, updatePassword)
router.route('/:id/addfriend').put(protect, addRemoveFriend)



export default router