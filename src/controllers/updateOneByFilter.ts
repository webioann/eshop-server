import User from '../models/user.model.ts';
import type { UserType } from '../types/user.types.ts';

type PartialUserType = Partial<UserType>;

export const updateUserData = async (filter: PartialUserType, updateData: PartialUserType) => {
    try {
        const updatedUserData = await User.findOneAndUpdate(filter, updateData,
            { new: true });
        console.log(`User updated in MongoDB`);
    } catch (error) {
        console.error("Error saving user data to MongoDB:", error);
        throw error;
    }
};