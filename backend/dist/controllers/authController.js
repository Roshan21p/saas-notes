"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInviteController = exports.loginController = void 0;
const authService_1 = require("../services/authService");
const loginController = async (req, res, next) => {
    try {
        const response = await (0, authService_1.loginService)(req.body);
        return res
            .status(200)
            .json({
            success: true,
            message: "Login sucessful",
            token: response.token,
            user: {
                id: response._id,
                email: response.email,
                role: response.role,
                tenantId: response.tenantId,
                name: response.name
            }
        });
    }
    catch (error) {
        console.log(" Auth controller error: ", error);
        next(error);
    }
};
exports.loginController = loginController;
const acceptInviteController = async (req, res, next) => {
    try {
        const response = await (0, authService_1.acceptInviteService)(req.body);
        res.status(200).json({
            success: true,
            message: "Invite accepted successfully. You can now log in.",
            data: response,
        });
    }
    catch (error) {
        console.log(" Accept invite controller error: ", error);
        next(error);
    }
};
exports.acceptInviteController = acceptInviteController;
//# sourceMappingURL=authController.js.map