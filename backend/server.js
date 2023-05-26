import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import uploadRoutes from './routes/uploadRoutes.js'
import authUsersRoutes from './routes/authUsersRoutes.js'
import userRoutes from './routes/userRoutes.js'


// configurations

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())


//ROUTES
app.use('/api/upload', uploadRoutes)
app.use('/api/auth/users', authUsersRoutes)
app.use('/api/users', userRoutes)

//STATIC FILES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, '/uploads')))

//ERROR MIDDLEWARES
app.use(notFound)
app.use(errorHandler)

// MONGOOSE SETUP
const PORT = process.env.PORT || 3001

app.listen(PORT, console.log(`app running in ${process.env.NODE_ENV} mode on port ${PORT}`))
