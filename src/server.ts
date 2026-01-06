import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { clerkMiddleware } from '@clerk/express'
import { ENV } from './config/env.config.ts';
import { connectToMongoDB } from './database/mongodb.ts';
import { saveUserDataToMongodb } from './controllers/saveUserDataToMongodb.ts';
import { getAllUsersFromMongodb } from './controllers/getAllUsersFromMongodb.ts';
import { findOneUserById } from './controllers/findOneUserById.ts';
import homeRoute from './routes/home.route.ts';

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
// Home page route
app.use('/', homeRoute);

// WEB SERVER FOR ADMIN PANEL IN PRODUCTION
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../admin/dist')));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../admin', 'dist', 'index.html'));
    })
}
const runExpressServer = async () => {
    app.listen(ENV.PORT, () => {
        console.log(`Server is running at http://${ENV.HOST}:${ENV.PORT} and ENV is ${ENV.NODE_ENV}`);
    });
    // await connectToMongoDB();
    // await saveUserDataToMongodb({
    //     username: 'testuser14456',
    //     email: 'testuser14456@example.com',
    //     password: 'password14456',
    //     createdAt: new Date(),
    //     updatedAt: null,
    // }) 
    // await getAllUsersFromMongodb();
    // await findOneUserById('695d045842f60d5d4af72846');
} 
runExpressServer();
