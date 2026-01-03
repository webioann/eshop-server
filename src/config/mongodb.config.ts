import mongoose from "mongoose";
import { ENV } from "./env.ts";

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(ENV.MONGODB_URI);
        console.log(`Connected to MongoDB ${ENV.MONGODB_URI}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};