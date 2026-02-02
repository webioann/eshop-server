import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import config from './config/env.ts';
import { connectToUsersDB } from './config/connectToUserDB.ts';
import homeRoute from './routes/home.route.ts';
import registerRoute from './routes/register.route.ts';
import loginRoute from './routes/login.route.ts'
import authRoute from './routes/auth.route.ts'
import ErrorMiddleware  from './middleware/error.middleware.ts';
import { protectRoute } from './middleware/protectRoute.middleware.ts';
import { generateUsername } from './utils/generateUsername.ts';
import cookieParser from 'cookie-parser';

const app = express();
const __dirname = path.resolve();
// Middlewares
app.use(express.json());
app.use(cookieParser());
let name = generateUsername();
console.log(`NAME ==> ${name}`);

// routs ---------------
app.use('/', homeRoute);
app.use('/test', protectRoute, homeRoute);
app.use('/auth', authRoute)
app.use('/auth/login', loginRoute)

app.use(ErrorMiddleware);
// WEB SERVER FOR ADMIN PANEL IN PRODUCTION
if (config.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../admin/dist')));
    app.get("/{*any}", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../admin', 'dist', 'index.html'));
    })
}

const runExpressServer = async () => {
    app.listen(config.PORT, () => {
        console.log(`Server is running at http://${config.HOST}:${config.PORT} and ENV is ${config.NODE_ENV}`);
    });
    await connectToUsersDB();
} 
runExpressServer();
