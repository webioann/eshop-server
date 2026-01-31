import mongoose, { Types } from 'mongoose';

export type RolesType  = "user" | "admin";
export type AuthProviderType  = "credentials" | "google" | "github";

export interface UserType extends mongoose.Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: RolesType;
    createdAt: Date;
}
