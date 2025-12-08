// This file extends Express Request type so we can use req.user and req.tenant without TS errors

// Import tenant type so req.tenant can have correct structure

import { ITenant } from "../models/tenant";
import "express"// Import Express types for declaration merging (no runtime import)


declare global {
    namespace Express {
        interface Request {
            // req.user comes from your JWT authentication middleware
            user?: {
                userId: string;
                tenantId: string;
                role: "Admin" | "Member";
                email?: string;
            };
            // req.tenant is a tenant document fetched from DB
            tenant?: ITenant | null;
        }
    }
}

// This ensures the file is treated as a module
//* - If this file has no imports or exports, TypeScript treats it as a script, not a module.
export {};

