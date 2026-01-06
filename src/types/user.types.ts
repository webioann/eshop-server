import mongoose from 'mongoose'
// mongoose User model interface
export interface UserType extends mongoose.Document {
    // id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date | null;
}

