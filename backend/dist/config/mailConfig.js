"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const serverConfig_1 = require("./serverConfig");
exports.transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: serverConfig_1.MAIL_ID,
        pass: serverConfig_1.MAIL_PASSWORD
    }
});
//# sourceMappingURL=mailConfig.js.map