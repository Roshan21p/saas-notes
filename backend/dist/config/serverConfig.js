"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.MAIL_PASSWORD = exports.MAIL_ID = exports.JWT_EXPIRY = exports.JWT_SECRET = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.DB_URL = process.env.DB_URL || "";
exports.JWT_SECRET = process.env.JWT_SECRET; // Use non-null assertion
exports.JWT_EXPIRY = process.env.JWT_EXPIRY; // Use non-null assertion
exports.MAIL_ID = process.env.MAIL_ID;
exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
//# sourceMappingURL=serverConfig.js.map