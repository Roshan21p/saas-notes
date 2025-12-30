import { Router } from "express";
import { requireAuth } from "../../middlewares/authMiddleware";
import {
  getMyTenantController,
  inviteUserController,
  upgradeTenantPlanController,
} from "../../controllers/tenantController";

const router = Router();

router.post("/:slug/upgrade", requireAuth, upgradeTenantPlanController);

router.post("/:slug/invite", requireAuth, inviteUserController);

router.get("/me", requireAuth, getMyTenantController); 


export default router;
