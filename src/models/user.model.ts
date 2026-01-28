import mongoose from 'mongoose'
import type { UserType } from '../types/user.types.ts'

const userSchema = new mongoose.Schema<UserType>(
    {
        username: { 
            type: String, 
            required: [ true, 'Username is required' ],
            trim: true, 
            minLength: 3, 
            maxLength: 30 
        },   
        email: {
            type: String,
            required: [ true, 'Email is required' ], 
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        },
        password: { 
            type: String, 
            required: [ true, 'Password is required' ],
            minLength: 6
        },
        createdAt: {
            type: Date, 
            default: Date.now 
        },
        updatedAt: { 
            type: Date, 
            default: null
        },
    }
);
const User = mongoose.model<UserType>('User', userSchema);

export default User;