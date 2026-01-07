import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

export const getAllUsersFromMongodb = async () => {
    try {
        // const users: UserType = new User();
        const users = await User.find({});
        console.log("User ==> ", users[0].username);
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};