"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUserController = exports.upgradeTenantPlanController = void 0;
const AppError_1 = require("../utils/AppError");
const tenantService_1 = require("../services/tenantService");
const upgradeTenantPlanController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication required. Please log in."));
        }
        const tenant = await (0, tenantService_1.upgradeTenantPlanService)(req.params.slug, req.user);
        return res.status(200).json({
            success: true,
            message: `Tenant ${tenant.name} upgraded to Pro plan successfully`,
            data: tenant,
        });
    }
    catch (error) {
        console.log("upgrade TenantPlan Controller error: ", error);
        next(error);
    }
};
exports.upgradeTenantPlanController = upgradeTenantPlanController;
const inviteUserController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication required. Please log in."));
        }
        await (0, tenantService_1.inviteUserService)(req.body, req.user, req.params.slug);
        res.status(200).json({
            success: true,
            message: "Invitation sent successfully.",
        });
    }
    catch (error) {
        console.log("Invite User Controller error: ", error);
        next(error);
    }
};
exports.inviteUserController = inviteUserController;
//# sourceMappingURL=tenantController.js.map