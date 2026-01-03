import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
}
