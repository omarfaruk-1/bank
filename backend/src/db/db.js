import mongoose from "mongoose";
import appConfig from "../config/appConfig.js";

async function connectDB(){
    try {
        await mongoose.connect(appConfig.DB_URI);
        console.log("connect to DB")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;