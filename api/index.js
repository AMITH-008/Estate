import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();

app.use('/api/user', userRouter);
//Connect to MongoDB using mongoose(ORM)
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to database");
}).catch((err) => console.log(err))

app.listen(5173, () => {
    console.log(`Server running on ${5173}`)
})

app.get('/', (request, response) => {
    response.send(request)
})