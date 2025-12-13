import { Tenant } from "../models/tenant";
import { AppError } from "../utils/AppError";
import { userData } from "./noteService";

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
