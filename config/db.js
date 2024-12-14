import mongoose from "mongoose";
import colors from 'colors'
import logger from "../helpers/logger.js";


const connectDB = async () => {
    try {
        const mongooseConnection = await mongoose.connect(process.env.MONGO_URL);
        logger.info("Database Connected Successfully");
    } catch (error) {
        console.log(`error while connection to mongoose DB ${error}`.bgRed.white);
    }
}


export default connectDB;