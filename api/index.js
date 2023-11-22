import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


//Connect to MongoDB using mongoose(ORM)
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to database");
}).catch((err) => console.log(err))

app.listen(5173, () => {
    console.log(`Server running on ${5173}`)
})