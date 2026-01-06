import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

export const getAllUsersFromMongodb = async () => {
    try {
        const users: UserType[] = User.find({});
        console.log("User ==> ", users[1]);
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};