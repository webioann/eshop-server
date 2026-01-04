import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API,
}
