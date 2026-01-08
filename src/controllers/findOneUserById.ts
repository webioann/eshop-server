import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

type findUserByIdResultType = UserType | null

export const findOneUserById = async (id: string) => {
    
    try {
        const user: findUserByIdResultType = await User.findById(id);
        console.log("User ==> ", user);
        return user;
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};