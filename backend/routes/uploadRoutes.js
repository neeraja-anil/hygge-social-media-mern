import express from 'express'
import path from 'path'
import multer from 'multer'

const router = express.Router()

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })
//FILE ROUTES
router.post('/', upload.single('picture'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router