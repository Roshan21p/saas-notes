"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("./AppError");
const serverConfig_1 = require("../config/serverConfig");
// -------- Type Guard to Validate Token Shape -------- //
function isJwtPayload(obj) {
    return (obj &&
        obj !== null &&
        typeof obj.id === "string" &&
        typeof obj.email === "string" &&
        typeof obj.role === "string" &&
        (obj.role === "Admin" || obj.role === "Member") &&
        typeof obj.tenantId === "string");
}
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, serverConfig_1.JWT_SECRET);
    // Validate the structure of decoded token
    if (!isJwtPayload(decoded)) {
        throw new AppError_1.AppError(401, "Unauthorized: Invalid token payload");
    }
    return decoded;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map