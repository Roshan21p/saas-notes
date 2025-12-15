"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/authController");
const router = (0, express_1.Router)();
router.post("/login", authController_1.loginController);
router.post("/accept-invite", authController_1.acceptInviteController);
exports.default = router;
//# sourceMappingURL=authRoute.js.map