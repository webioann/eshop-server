import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

export const findOneUserById = async (id: string) => {
    
    try {
        const user: UserType = User.findById(id, 'username');
        console.log("User ==> ", user.schema.paths.username);
        return user;
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};