import { Request } from 'express';
import type { UserType } from "./user.types.ts";

declare module 'Express' {
    interface Request {
        // Add your custom property here
        user?: UserType
    }
}
