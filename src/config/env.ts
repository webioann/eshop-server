import dotenv from 'dotenv';
dotenv.config();
import type ms from 'ms'

const config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    // jsonwebtoken variables
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
    WHITELIST: process.env.WHITELIST,

    USERS_DB_URI: process.env.USERS_DB_URI,
    PRODUCTS_DB_URI: process.env.PRODUCTS_DB_URI,
    MONGODB_URI: process.env.MONGODB_URI,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API,
}
export default config;