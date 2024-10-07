// packages imports
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan';
import 'express-async-errors';


// Security packages
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// file imports
import connectDB from './config/db.js';

//routes imports
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleWare.js';
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'

// config Dot ENV
dotenv.config()

//mongo db connection

connectDB();

// rest object
const app = express();

// middlewares
// for security
app.use(helmet())           // To secure Headers
app.use(xss())              // to secure from XSS attacks
app.use(mongoSanitize())    //To secure DB

// Also Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routes
// app.get('/', (req, res)=>{
//     res.send("Hello World")
// })

app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/job', jobsRoutes)


// validation Middleware
app.use(errorMiddleware)

// port
const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log(`Server is Running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.yellow)
})