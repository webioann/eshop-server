import mongoose from "mongoose";
import { ENV } from "./env.ts";
import { EventLogger } from "../middleware/event_logger.middleware.ts";

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
export const connectToUsersDB = async () => {
    try {
        if(!ENV.USERS_DB_URI) {
            throw new EventLogger(501, "USER_DB_URI is not defined in environment variables");
        }
        const connect = await mongoose.connect(ENV.USERS_DB_URI);
        console.log(`Connected to Users DB, to collection name ==> ${connect.connection.name}`);
    } catch (error) {
        console.error("Error connecting to Users DB:", error);
        process.exit(1);
    }
};