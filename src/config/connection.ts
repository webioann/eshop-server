import mongoose from "mongoose";
import { ENV } from "./env.ts";

export const connection = async () => {
    if(!ENV.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }
    try {
        const connect = await mongoose.connect(ENV.MONGODB_URI);
        console.log(`Connected to MongoDB, to collection name ==> ${connect.connection.name}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};