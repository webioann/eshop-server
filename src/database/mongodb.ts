import mongoose from "mongoose";
import { ENV } from "../config/env.config.ts";

// if ENV.MONGODB_URI is not defined stop the application
if(!ENV.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(ENV.MONGODB_URI);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};