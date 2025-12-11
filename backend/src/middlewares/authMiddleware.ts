import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/verifyToken";


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        //1. Check if Authorization header exists and has Bearer token
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new AppError(401,"Unauthorized: Missing or invalid token")
        }

        // 2. Extract token
        const token = authHeader.split(" ")[1];

        if(!token){
            throw new AppError(401,"No auth token provided. Please log in again.");
        }

        // 3. Centralized verification
        const decoded = verifyToken(token);

        
         // 4. Attach user info to req.user (for later middleware/controllers)
         req.user = {
            userId: decoded.id,
            email: decoded.email,
            role: decoded.role,
            tenantId: decoded.tenantId
         }

         next();
    } catch (error) {
        console.log("Auth middleware error", error);
        // If JWT verification fails or other error happens, forward error to error handler
        next(new AppError(401, "Unauthorized: Invalid or expired token"));
    }
}

