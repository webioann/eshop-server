import type { Response, Request, NextFunction } from "express";
import type { UserType } from "../types/user.types.ts";

export const checkIfAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - user not found" });
        }
        if( req.user.role !== "admin" ) {
            return res.status(403).json({ message: "Forbidden - admin access only" });
        }
        next();
    } catch (error) { console.log(error); }
}
