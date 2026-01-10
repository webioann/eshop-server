import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { clerkMiddleware } from '@clerk/express'
import { ENV } from './config/env.config.ts';
// connections to MongoDB functions for two different collections
import { connection } from './config/connection.ts';
// controllers for work with MongoDB
import { saveUserDataToMongodb } from './controllers/saveUserDataToMongodb.ts';
import { getAllUsersFromMongodb } from './controllers/getAllUsersFromMongodb.ts';
import { findOneUserById } from './controllers/findOneUserById.ts';
import { deleteUserById } from './controllers/deleteUserById.ts';
import { updateUserData } from './controllers/updateOneByFilter.ts';
import EventEmitterLogger from './controllers/EventEmitterLogger.ts';
// routs 
import homeRoute from './routes/home.route.ts';
import registerRoute from './routes/register.route.ts';
import loginRoute from './routes/login.route.ts'
import testRoute from './routes/test.route.ts';

const app = express();
const __dirname = path.resolve();
// Middlewares
app.use(express.json());
app.use('/', homeRoute);
app.use('/auth/register', registerRoute)
app.use('/auth/login', loginRoute)
app.use('/test', testRoute);

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
    await connection();
    await EventEmitterLogger({ event_id: "error", message: "Server crashed" });
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
