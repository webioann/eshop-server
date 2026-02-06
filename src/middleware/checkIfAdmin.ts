import type { Response, Request, NextFunction } from "express";
import type { RolesType } from "@shared-types/user.types.ts";

const protectedRole = (roles: RolesType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user.role
        if ( userRole !== roles ) {
            res.status(403).json({
                message: "Access denied"
            })
        }
        next();
    }
}
export default protectedRole;

