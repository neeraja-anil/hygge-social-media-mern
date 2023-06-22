import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createNewPost, getPostById, deletePost } from '../controllers/postController.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.route('/create').post(protect, upload.single('post'), createNewPost)
router.route('/:id').get(protect, getPostById).delete(protect, deletePost)

export default router