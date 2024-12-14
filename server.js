import express from 'express'
import dotenv from 'dotenv'
import colors from "colors";
import cors from 'cors'
import connectDB from './config/db.js';
import PasswordRoute from './routers/password-router.js'
dotenv.config()


const app = express()

// database connection
connectDB()

// variables
app.use(express.json())
app.use(cors());


app.use('/api/v1', PasswordRoute)



app.get('/', (req, res) => {
    res.send("hello word")
})


const PORT = process.env.PORT;
app.listen(`${PORT}`, () => {
    console.log("Server is running....".rainbow);
    console.log(`http://localhost:${PORT}`.underline.red);
})

