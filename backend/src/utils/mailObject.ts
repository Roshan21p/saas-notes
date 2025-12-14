import { transporter } from "../config/mailConfig";
import { AppError } from "./AppError";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"SaaS Notes App" <no-reply@saasnotes.com>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new AppError(
      500,
      "Email service is currently unavailable. Please try again later."
    );
  }
};
