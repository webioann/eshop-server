import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

export const saveUserDataToMongodb = async (userData: UserType) => {
    try {
        const user = new User(userData);    
        await user.save();
        console.log("User data saved to MongoDB");
    } catch (error) {
        console.error("Error saving user data to MongoDB:", error);
        throw error;
    }
};