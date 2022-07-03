import mongoose from "mongoose";
import config from "../config/mongoDB"

const connectDB = async () => {
    try {
        await mongoose.connect(config.DB_URL);
        console.log('Connected to database ' + config.DB_URL);
    } catch (err) {
        console.log('Error: ', err);
    }
}

export default connectDB;