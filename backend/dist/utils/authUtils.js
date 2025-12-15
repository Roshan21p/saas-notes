"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serverConfig_1 = require("../config/serverConfig");
const createJWT = (payload) => {
    return jsonwebtoken_1.default.sign(payload, serverConfig_1.JWT_SECRET, {
        expiresIn: serverConfig_1.JWT_EXPIRY,
    });
};
exports.createJWT = createJWT;
//# sourceMappingURL=authUtils.js.map