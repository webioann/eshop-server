import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_USERS_URI: process.env.MONGODB_USERS_URI,
    MONGODB_LOGGER_URI: process.env.MONGODB_LOGGER_URI,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API,
}
