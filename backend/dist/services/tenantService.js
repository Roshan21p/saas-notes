"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUserService = exports.upgradeTenantPlanService = void 0;
const serverConfig_1 = require("../config/serverConfig");
const tenant_1 = require("../models/tenant");
const user_1 = require("../models/user");
const AppError_1 = require("../utils/AppError");
const mailObject_1 = require("../utils/mailObject");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const upgradeTenantPlanService = async (slug, user) => {
    try {
        const { userId, tenantId, role } = user || {};
        if (role !== "Admin") {
            throw new AppError_1.AppError(403, "Only Admins can upgrade the tenant plan");
        }
        if (!slug) {
            throw new AppError_1.AppError(400, "Slug name is required.");
        }
        const tenant = await tenant_1.Tenant.findOne({ slug });
        if (!tenant) {
            throw new AppError_1.AppError(404, "Tenant not found");
        }
        // Check tenant ownership
        if (tenant._id.toString() !== tenantId) {
            throw new AppError_1.AppError(403, "You do not have permission to upgrade this tenant");
        }
        if (tenant.plan === "pro") {
            throw new AppError_1.AppError(400, "Tenant is already on the Pro plan");
        }
        tenant.plan = "pro";
        tenant.noteLimit = 50;
        await tenant.save();
        return tenant;
    }
    catch (error) {
        throw error;
    }
};
exports.upgradeTenantPlanService = upgradeTenantPlanService;
const inviteUserService = async (data, inviter, slug) => {
    try {
        const { name, email, role = "Member", tenantId = inviter.tenantId, } = data || {};
        if (!name || !email) {
            throw new AppError_1.AppError(400, "Name and email field is required.");
        }
        // Only admin can invite
        if (inviter.role !== "Admin") {
            throw new AppError_1.AppError(403, "Only Admins can invite users.");
        }
        if (!slug) {
            throw new AppError_1.AppError(400, "Slug name is required.");
        }
        const tenant = await tenant_1.Tenant.findOne({ slug });
        if (!tenant) {
            throw new AppError_1.AppError(404, "Tenant not found");
        }
        // Check tenant ownership
        if (tenant._id.toString() !== tenantId) {
            throw new AppError_1.AppError(403, "You do not have permission to upgrade this tenant");
        }
        // Check if user already exists
        const existingUser = await user_1.User.findOne({ email, tenantId });
        if (existingUser) {
            throw new AppError_1.AppError(400, "User with this email already exists.");
        }
        const newUser = await user_1.User.create({
            name,
            email,
            role,
            tenantId,
            password: "password",
            isInvited: true,
        });
        const inviteToken = jsonwebtoken_1.default.sign({ id: newUser._id, email, role, tenantId }, serverConfig_1.JWT_SECRET, { expiresIn: "2d" });
        // Create invitation URL (frontend handles invite acceptance)
        const inviteUrl = `${serverConfig_1.FRONTEND_URL}/invite?token=${inviteToken}`;
        const companyName = slug
            ? slug.charAt(0).toUpperCase() + slug.slice(1)
            : "";
        // Compose email content
        const emailHtml = `
    <p>Hello ${name},</p>
    <p>You have been invited to join the SaaS Notes app under <strong>${companyName}</strong>  Corporation company tenant.</p>
    <p>Please click the link below to accept the invitation and set your password:</p>
    <a href="${inviteUrl}">Accept Invitation</a>
    <p>This link expires in 2 days.</p>
  `;
        // Send the invite email
        await (0, mailObject_1.sendEmail)(email, "You're invited to join SaaS Notes app", emailHtml);
    }
    catch (error) {
        throw error;
    }
};
exports.inviteUserService = inviteUserService;
//# sourceMappingURL=tenantService.js.map