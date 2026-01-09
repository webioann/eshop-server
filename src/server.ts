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
import { deleteUserById } from './controllers/deleteUserById.ts';
import { updateUserData } from './controllers/updateOneByFilter.ts';
import EventEmitterLogger from './controllers/EventEmitterLogger.ts';


// Load environment variables from .env file
const app = express();
const __dirname = path.resolve();
// Middlewares
app.use(express.json());
// Home page route
// app.use('/', homeRoute);

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
    // await EventEmitterLogger({ event_id: "success", message: "Server started successfully." });
    // await saveUserDataToMongodb({
    //     username: 'testuser12372',
    //     email: 'testuser12372@example.com',
    //     password: 'password12372',
    //     createdAt: new Date(),
    //     updatedAt: null,
    // }) 
    // await getAllUsersFromMongodb();
    // await findOneUserById('695ec2b31244511a17db387a');

    // await deleteUserById('695ec2b31244511a17db387a');
    // await updateUserData({ password:"password123" }, { email: 'testuser8888888@example.com' });
} 
runExpressServer();
