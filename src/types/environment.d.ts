// Use an empty export or import statement to make the file a module
// and enable global augmentation
export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'; // Example with literal types
            PORT: 8383; // Optional variables
            HOST: string;
            DATABASE_URL: string;
            JWT_SECRET: string;
            USERS_DB_URI: string;
            PRODUCTS_DB_URI: string;
            MONGODB_URI: string;
            CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string;
            CLERK_FRONTEND_API: string;
        }
    }
}
