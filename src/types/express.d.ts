import { Request } from 'express';
import type { UserType } from "./user.types.ts";

// Extend the Request interface using declaration merging
declare module 'express' {
    interface Request {
        // Add your custom property here
        user: UserType
    }
}
