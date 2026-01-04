import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { clerkMiddleware } from '@clerk/express'
import { ENV } from './config/env.ts';
import { connectToMongoDB } from './config/mongodb.config.ts';

// Load environment variables from .env file
const app = express();
const __dirname = path.resolve();
// Middlewares
app.use(express.json());
app.use(clerkMiddleware({
    apiKey: ENV.CLERK_API_KEY,
    secretKey: ENV.CLERK_SECRET_KEY,
    frontendApi: ENV.CLERK_FRONTEND_API,
}));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: `ENV is ${ENV.NODE_ENV}` });
});

// WEB SERVER FOR ADMIN PANEL IN PRODUCTION
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../admin/dist')));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../admin', 'dist', 'index.html'));
    })
}
const runExpressServer = async () => {
    connectToMongoDB();
    app.listen(ENV.PORT, () => {
        console.log(`Server is running at http://${ENV.HOST}:${ENV.PORT} and ENV is ${ENV.NODE_ENV}`);
    });
}
runExpressServer();
