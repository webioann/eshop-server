import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { ENV } from './config/env.ts';
import { connectToUsersDB } from './config/connectToUserDB.ts';
import homeRoute from './routes/home.route.ts';
import registerRoute from './routes/register.route.ts';
import loginRoute from './routes/login.route.ts'
import ErrorMiddleware  from './middleware/error.middleware.ts';
import { protectRoute } from './middleware/protectRoute.middleware.ts';

const app = express();
const __dirname = path.resolve();
// Middlewares
app.use(express.json());

// routs ---------------
app.use('/', homeRoute);
app.use('/test', homeRoute);
app.use('/auth/register', registerRoute)
app.use('/auth/login', loginRoute)

app.use(ErrorMiddleware);
// WEB SERVER FOR ADMIN PANEL IN PRODUCTION
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../admin/dist')));
    app.get("/{*any}", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../admin', 'dist', 'index.html'));
    })
}

const runExpressServer = async () => {
    app.listen(ENV.PORT, () => {
        console.log(`Server is running at http://${ENV.HOST}:${ENV.PORT} and ENV is ${ENV.NODE_ENV}`);
    });
    await connectToUsersDB();
} 
runExpressServer();
