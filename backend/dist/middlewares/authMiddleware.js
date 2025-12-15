"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const AppError_1 = require("../utils/AppError");
const verifyToken_1 = require("../utils/verifyToken");
const requireAuth = (req, res, next) => {
    try {
        //1. Check if Authorization header exists and has Bearer token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new AppError_1.AppError(401, "Unauthorized: Missing or invalid token"));
        }
        // 2. Extract token
        const token = authHeader.split(" ")[1];
        if (!token) {
            return next(new AppError_1.AppError(401, "No auth token provided. Please log in again."));
        }
        // 3. Centralized verification
        const decoded = (0, verifyToken_1.verifyToken)(token);
        // 4. Attach user info to req.user (for later middleware/controllers)
        req.user = {
            userId: decoded.id,
            email: decoded.email,
            role: decoded.role,
            tenantId: decoded.tenantId,
        };
        next();
    }
    catch (error) {
        console.log("Auth middleware error", error);
        // If JWT verification fails or other error happens, forward error to error handler
        return next(new AppError_1.AppError(401, "Unauthorized: Invalid or expired token"));
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=authMiddleware.js.map