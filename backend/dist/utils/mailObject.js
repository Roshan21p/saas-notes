"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mailConfig_1 = require("../config/mailConfig");
const AppError_1 = require("./AppError");
const sendEmail = async (to, subject, html) => {
    try {
        await mailConfig_1.transporter.sendMail({
            from: `"SaaS Notes App" <no-reply@saasnotes.com>`,
            to,
            subject,
            html,
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new AppError_1.AppError(500, "Email service is currently unavailable. Please try again later.");
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailObject.js.map