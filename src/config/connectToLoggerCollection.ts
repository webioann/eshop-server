import mongoose from "mongoose";
import { ENV } from "./env.config.ts";
// if ENV.MONGODB_LOGGER_URI is not defined stop the application
if(!ENV.MONGODB_LOGGER_URI) {
    throw new Error("MONGODB_LOGGER_URI is not defined in environment variables");
}

export const connectToLoggerCollection = async () => {
    try {
        const connect = await mongoose.connect(ENV.MONGODB_LOGGER_URI);
        console.log(`Connected to MongoDB : host ==> ${connect.connection.host} name ==> ${connect.connection.name}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};