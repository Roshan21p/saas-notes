import { FRONTEND_URL, JWT_SECRET } from "../config/serverConfig";
import { Tenant } from "../models/tenant";
import { User } from "../models/user";
import { AppError } from "../utils/AppError";
import { sendEmail } from "../utils/mailObject";
import { userData } from "./noteService";
import jwt from "jsonwebtoken";

interface inviteUserInput {
  name: string;
  email: string;
  role: "Admin" | "Member";
  tenantId: string;
}

export const upgradeTenantPlanService = async (
  slug: string | undefined,
  user: userData
) => {
  try {
    const { userId, tenantId, role } = user || {};

    if (role !== "Admin") {
      throw new AppError(403, "Only Admins can upgrade the tenant plan");
    }

    if (!slug) {
      throw new AppError(400, "Slug name is required.");
    }

    const tenant = await Tenant.findOne({ slug });

    if (!tenant) {
      throw new AppError(404, "Tenant not found");
    }

    // Check tenant ownership
    if (tenant._id.toString() !== tenantId) {
      throw new AppError(
        403,
        "You do not have permission to upgrade this tenant"
      );
    }

    if (tenant.plan === "pro") {
      throw new AppError(400, "Tenant is already on the Pro plan");
    }

    tenant.plan = "pro";
    tenant.noteLimit = 50;

    await tenant.save();

    return tenant;
  } catch (error) {
    throw error;
  }
};

export const inviteUserService = async (
  data: inviteUserInput,
  inviter: userData,
  slug: string | undefined
) => {
  try {
    const {
      name,
      email,
      role = "Member",
      tenantId = inviter.tenantId,
    } = data || {};

    if (!name || !email) {
      throw new AppError(400, "Name and email field is required.");
    }
    // Only admin can invite
    if (inviter.role !== "Admin") {
      throw new AppError(403, "Only Admins can invite users.");
    }

    if (!slug) {
      throw new AppError(400, "Slug name is required.");
    }

    const tenant = await Tenant.findOne({ slug });

    if (!tenant) {
      throw new AppError(404, "Tenant not found");
    }

    // Check tenant ownership
    if (tenant._id.toString() !== tenantId) {
      throw new AppError(
        403,
        "You do not have permission to upgrade this tenant"
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email, tenantId });

    if (existingUser) {
      throw new AppError(400, "User with this email already exists.");
    }

    const newUser = await User.create({
      name,
      email,
      role,
      tenantId,
      password: "password",
      isInvited: true,
    });

    const inviteToken = jwt.sign(
      { userId: newUser._id, email, role, tenantId },
      JWT_SECRET,
      { expiresIn: "2d" }
    );

    // Create invitation URL (frontend handles invite acceptance)
    const inviteUrl = `${FRONTEND_URL}/invite?token=${inviteToken}`;

    console.log("inviteUrl", inviteUrl);

    const companyName = slug
      ? slug.charAt(0).toUpperCase() + slug.slice(1)
      : "";
    console.log("companyName", companyName);

    // Compose email content
    const emailHtml = `
    <p>Hello ${name},</p>
    <p>You have been invited to join the SaaS Notes app under <strong>${companyName}</strong>  Corporation company tenant.</p>
    <p>Please click the link below to accept the invitation and set your password:</p>
    <a href="${inviteUrl}">Accept Invitation</a>
    <p>This link expires in 2 days.</p>
  `;

    // Send the invite email
    await sendEmail(email, "You're invited to join SaaS Notes app", emailHtml);
  } catch (error) {
    throw error;
  }
};
