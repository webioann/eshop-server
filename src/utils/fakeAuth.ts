import type { UserType, RolesType } from "../types/user.types.ts";
import mongoose, { Types } from 'mongoose';

export const fakeAuth = (role: RolesType) => {
    const user = {
        _id: new Types.ObjectId('697c928cf4d0225a872ffa96'),
        username: "USER",
        email: "useremail@gmail.com",
        password: "",
        role: "user",
        createdAt: new Date,
    } as UserType
    const admin = {
        _id: new Types.ObjectId('6962adb9e680ca0bc804d2fd'),
        username: "ADMIN",
        email: "adminemail@gmail.com",
        password: "",
        role: "admin",
        createdAt: new Date,
    } as UserType

    if( role === "user" ) return null
    if( role === "admin" ) return admin
}