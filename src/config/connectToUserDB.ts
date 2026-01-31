import mongoose from "mongoose";
import { ENV } from "./env.ts";
import { CustomErrorHandler } from "../middleware/error.middleware.ts";

export const connectToUsersDB = async () => {
    try {
        if(!ENV.USERS_DB_URI) {
            throw new CustomErrorHandler(501, "USER_DB_URI is not defined in environment variables");
        }
        const connect = await mongoose.connect(ENV.USERS_DB_URI);
        console.log(`Connected to Users DB, to collection name ==> ${connect.connection.name}`);
    } catch (error) {
        console.error("Error connecting to Users DB:", error);
        process.exit(1);
    }
};