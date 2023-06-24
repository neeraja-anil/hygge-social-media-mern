import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import multer from 'multer'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import authUsersRoutes from './routes/authUsersRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { upload } from './utils/multer.js'


// configurations

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("dev"))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

//FILE ROUTES
// app.post('/api/upload', upload.single('picturePath'), (req, res) => {
//     res.send(`/${req.file.path}`)
// })

//ROUTES
app.use('/api/auth/users', authUsersRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

//STATIC FILES

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (!fs.existsSync(path.join(__dirname, '/uploads'))) {
    fs.mkdirSync(path.join(__dirname, '/uploads'));
}

//ERROR MIDDLEWARES
app.use(notFound)
app.use(errorHandler)

// MONGOOSE SETUP
const PORT = process.env.PORT || 3001

app.listen(PORT, console.log(`app running in ${process.env.NODE_ENV} mode on port ${PORT}`))
