import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import path from 'path'

dotenv.config();

const app = express();
const __dirname = path.resolve()


app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client','dist', 'index.html')))

app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
//Connect to MongoDB using mongoose(ORM)
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to database");
}).catch((err) => console.log(err))

app.listen(3000, () => {
    console.log(`Server running on ${3000}`)
})

app.get('/', (request, response) => {
    response.send("Hello World")
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})