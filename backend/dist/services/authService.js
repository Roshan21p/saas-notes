"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInviteService = exports.loginService = void 0;
const user_1 = require("../models/user");
const AppError_1 = require("../utils/AppError");
const authUtils_1 = require("../utils/authUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyToken_1 = require("../utils/verifyToken");
const loginService = async (data) => {
    try {
        const { email, password } = data;
        //1. check whether the data missing or not
        if (!email || !password) {
            throw new AppError_1.AppError(400, "Email and password required");
        }
        //2. Check if there is a registered user with the given email
        const user = await user_1.User.findOne({ email });
        if (!user) {
            throw new AppError_1.AppError(404, "No registered user found with this email");
        }
        //3. Match the incoming password with the hashed password in the database
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new AppError_1.AppError(400, "Invalid password, please try again");
        }
        //4. Create JWT
        const token = (0, authUtils_1.createJWT)({
            id: user._id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        });
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
            token,
        };
    }
    catch (error) {
        console.log("Auth service error", error);
        throw error;
    }
};
exports.loginService = loginService;
const acceptInviteService = async ({ token, password }) => {
    try {
        if (!token) {
            throw new AppError_1.AppError(400, "Invite token is required.");
        }
        if (!password) {
            throw new AppError_1.AppError(400, "Password is required.");
        }
        let payload;
        payload = (0, verifyToken_1.verifyToken)(token);
        const user = await user_1.User.findById(payload.id);
        if (!user) {
            throw new AppError_1.AppError(404, "User not found.");
        }
        if (!user.isInvited) {
            throw new AppError_1.AppError(400, "Invite already accepted.");
        }
        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        user.password = hashedPassword;
        user.isInvited = false; // mark as accepted
        await user.save();
    }
    catch (error) {
        throw error;
    }
};
exports.acceptInviteService = acceptInviteService;
//# sourceMappingURL=authService.js.map