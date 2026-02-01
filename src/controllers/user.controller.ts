import User from '../models/user.model.ts';
import type { UserType } from '@shared-types/user.types.ts';

type PartialUserType = Omit<UserType, '_id' | 'createdAt' | 'updatedAt' | 'password'>;
type filterType = Record<keyof PartialUserType, any>;
type findUserByIdResultType = UserType | null;

export const saveUserDataToMongodb = async (userData: UserType) => {
    try {
        const user: UserType = new User(userData)
        await user.save();
        console.log(`User saved to MongoDB`);
    } catch (error) {
        console.error("Error saving user data to MongoDB:", error);
        throw error;
    }
}; 

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

export const getAllUsersFromMongodb = async () => {
    try {
        // const users: UserType = new User();
        const users = await User.find({});
        console.log("User ==> ", users[0].username);
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};

export const findOneUserById = async (id: string) => {
    
    try {
        const user: findUserByIdResultType = await User.findById(id);
        console.log("User ==> ", user);
        return user;
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};

export const deleteUserById = async (id: string) => {
    try {
        await User.findByIdAndDelete(id);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("ERROR USER ERROR :", error);
    }
};