import { Router } from "express";
import { requireAuth } from "../../middlewares/authMiddleware";
import {
  inviteUserController,
  upgradeTenantPlanController,
} from "../../controllers/tenantController";

const router = Router();

router.post("/:slug/upgrade", requireAuth, upgradeTenantPlanController);

router.post("/:slug/invite", requireAuth, inviteUserController);

export default router;
