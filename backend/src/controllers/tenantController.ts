import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { upgradeTenantPlanService } from "../services/tenantService";

export const upgradeTenantPlanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError(401, "Authentication required. Please log in."));
    }

    const tenant = await upgradeTenantPlanService(req.params.slug, req.user);

    return res.status(200).json({
      success: true,
      message: `Tenant ${tenant.name} upgraded to Pro plan successfully`,
      data: tenant,
    });
  } catch (error) {
    console.log("upgrade TenantPlan Controller error: ", error);
    next(error);
  }
};
