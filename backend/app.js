import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/useRouters.js'
import applicationRouter from './routes/applicationRouter.js'
import jobRouter from './routes/jobRouter.js'
import dbconn from './database/dbconnection.js'
import errorMiddleware from './middleware/error.js'

dotenv.config({ path: './config/config.env' })


const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

dbconn()

app.use('/api/user', userRouter)
app.use('/api/application', applicationRouter)
app.use('/api/job', jobRouter)

app.use(errorMiddleware)

export default app