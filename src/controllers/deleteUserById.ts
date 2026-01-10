import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

export const deleteUserById = async (id: string) => {
    try {
        await User.findByIdAndDelete(id);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};