"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const tenantController_1 = require("../../controllers/tenantController");
const router = (0, express_1.Router)();
router.post("/:slug/upgrade", authMiddleware_1.requireAuth, tenantController_1.upgradeTenantPlanController);
router.post("/:slug/invite", authMiddleware_1.requireAuth, tenantController_1.inviteUserController);
exports.default = router;
//# sourceMappingURL=tenantRoute.js.map