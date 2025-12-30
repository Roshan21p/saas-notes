import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import {
  getMyTenantService,
  inviteUserService,
  upgradeTenantPlanService,
} from "../services/tenantService";

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

export const inviteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError(401, "Authentication required. Please log in."));
    }

    await inviteUserService(req.body, req.user, req.params.slug);

    res.status(200).json({
      success: true,
      message: "Invitation sent successfully.",
    });
  } catch (error) {
    console.log("Invite User Controller error: ", error);
    next(error);
  }
};

export const getMyTenantController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError(401, "Authentication required. Please log in."));
    }

    const response = await getMyTenantService(req.user);

    res.status(200).json({
      success: true,
      message: "Tenant fetched successfully",
      data: response,
    });
  } catch (error) {
    console.log("Get My Tenant Controller error: ", error);
    next(error);
  }
};
