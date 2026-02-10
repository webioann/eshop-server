// Use an empty export or import statement to make the file a module
// and enable global augmentation
export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'; // Example with literal types
            PORT: 8383; // Optional variables
            HOST: string;
            // AUTHENTICATION =====
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            ACCESS_TOKEN_EXPIRY: string;
            REFRESH_TOKEN_EXPIRY: string;
            WHITELIST: string[];
            USERS_DB_URI: string;
            PRODUCTS_DB_URI: string;
            MONGODB_URI: string;
            CLOUD_NAME: string;
            CLOUD_API_KEY: string;
            CLOUD_SECRET: string;
            CLOUDINARY_URL: string;
        
        }
    }
}
