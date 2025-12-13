import { Router } from "express";
import { requireAuth } from "../../middlewares/authMiddleware";
import { upgradeTenantPlanController } from "../../controllers/tenantController";

const router = Router();

router.post("/:slug/upgrade", requireAuth, upgradeTenantPlanController);

export default router;
