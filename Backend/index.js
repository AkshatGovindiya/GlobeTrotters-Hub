import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'




dotenv.config()
const app = express()
const port = process.env.PORT || 8000;
const corsOptions = {
    origin:true,
    Credentials:true
}

//database connection
mongoose.set("strictQuery",false)
const connect = async()=>{
    try{
        await mongoose.connect('mongodb+srv://AkshatGajjar:Akshatgajjar2112@cluster0.qpubusm.mongodb.net/',{
               
        })
        console.log('====MONGODB database connected====')

    }catch(err){
        console.log('===Mongodb database connection ERROR===')
    }
}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));



//middlewere
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/review',reviewRoute)
app.use('/api/v1/booking',bookingRoute)

app.options('/api/v1/auth/login', cors());


app.listen(port,()=>{
    connect();
    console.log('==server listening on port==',port);
})
