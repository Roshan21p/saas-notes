import nodemailer from "nodemailer";
import { MAIL_ID, MAIL_PASSWORD } from "./serverConfig";

export const transporter  = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: MAIL_ID,
        pass: MAIL_PASSWORD
    }
});