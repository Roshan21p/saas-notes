"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const noteRoute_1 = __importDefault(require("./noteRoute"));
const tenantRoute_1 = __importDefault(require("./tenantRoute"));
const router = (0, express_1.Router)();
router.use('/auth', authRoute_1.default);
router.use('/notes', noteRoute_1.default);
router.use('/tenants', tenantRoute_1.default);
exports.default = router;
//# sourceMappingURL=v1Router.js.map