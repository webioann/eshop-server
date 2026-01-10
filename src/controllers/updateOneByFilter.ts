import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

type PartialUserType = Omit<UserType, '_id' | 'createdAt' | 'updatedAt' | 'password'>;
type filterType = Record<keyof PartialUserType, any>;

export const updateUserData = async (filter: filterType, updateData: PartialUserType) => {
    try {
        const updatedUserData = await User.findOneAndUpdate(filter, updateData,
            { new: true });
        console.log(`User updated in MongoDB`);
    } catch (error) {
        console.error("Error saving user data to MongoDB:", error);
        throw error;
    }
};