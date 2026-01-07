import mongoose from 'mongoose';

export interface UserType extends mongoose.Document {
    id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date | null;
}
