import jwt from "jsonwebtoken";
import config from '../config/env.ts'
import { Types } from "mongoose";

// export const createAccessToken = (userId: Types.ObjectId): string => {
//     return jwt.sign({
//         { userId }, config
//     })
// }