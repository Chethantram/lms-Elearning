import dotenv from 'dotenv';
dotenv.config({});
import express from 'express';
import userRouter from './routes/user.routes.js'
import courseRouter from './routes/course.routes.js'
import mediaRouter from './routes/media.routes.js'
import coursePurchaseRouter from './routes/coursePurchase.routes.js'
import courseProgressRouter from './routes/courseProgress.routes.js'
import { connectDb } from './db/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
const port = 5000 || process.env.PORT;


//connection
connectDb();

//middleware

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());


//routes
app.use('/api/user',userRouter)
app.use('/api/course',courseRouter)
app.use('/api/media',mediaRouter)
app.use('/api/purchase',coursePurchaseRouter)
app.use('/api/progress',courseProgressRouter)

app.listen(port, () => console.log(`server listen at port : ${port}`));