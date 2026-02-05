import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import config from './config/env.ts';
import { connectToUsersDB } from './config/connectToUserDB.ts';
import adminRoute from './routes/admin.route.ts'
import productsRoute from './routes/product.route.ts'
import authRoute from './routes/auth.route.ts'
import ErrorMiddleware  from './middleware/error.middleware.ts';
import cookieParser from 'cookie-parser';

const app = express();
const __dirname = path.resolve();
// Middlewares
app.use(express.json());
app.use(cookieParser());

// routs ---------------
app.use('/auth', authRoute)
app.use('/api', productsRoute)
app.use("/admin", adminRoute)

app.use(ErrorMiddleware);
// WEB SERVER FOR ADMIN PANEL IN PRODUCTION
if (config.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../admin/dist')));
    app.get("/{*any}", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../admin', 'dist', 'index.html'));
    })
}

( async () => {
    app.listen(config.PORT, () => {
        console.log(`Server is running at http://${config.HOST}:${config.PORT} and ENV is ${config.NODE_ENV}`);
    });
    await connectToUsersDB();
}) ();

