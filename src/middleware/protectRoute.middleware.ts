import type { Response, Request, NextFunction } from "express";
import { fakeAuth } from "../utils/fakeAuth.ts";
import User from "../models/user.model.ts"

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // IN THIS PLACE NEED USING REAL AUTH
        const user = fakeAuth("user")
        if(!user) {
            return res.status(401).json({ message: "Unauthorized - invalid token" })
        }
        next();
        const userData = await User.findOne({username: user.username})
        if(!userData) {
            return res.status(404).json({ message: "User not found" })
        }
        req.user = userData
        console.log(`REQUEST USER ==> ${req.user}`);
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware", error)
        res.status(500).json({ message: "Internal server error" })
    }
}