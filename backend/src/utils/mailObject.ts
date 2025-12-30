import { transporter } from "../config/mailConfig";
import { AppError } from "./AppError";

interface InviteUserEmailParams {
  name: string;
  email: string;
  role: "Member" | "Admin";
  companyName: string;
  inviteUrl: string;
}

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



export const inviteUserEmail = ({
  name,
  email,
  role,
  companyName,
  inviteUrl,
}: InviteUserEmailParams): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111827">
      <p>Hello <strong>${name}</strong>,</p>

      <p>
        You’ve been invited to join 
        <strong>${companyName}</strong> on 
        <strong>SaaS Notes</strong> as a 
        <strong>${role}</strong>.
      </p>

      <p>
        <strong>Account email:</strong> ${email}
      </p>

      <p>
        Click the button below to accept the invitation and set your password:
      </p>

      <p>
        <a 
          href="${inviteUrl}"
          style="
            display:inline-block;
            padding:12px 18px;
            background:#4f46e5;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
            font-weight:600;
          "
        >
          Accept Invitation
        </a>
      </p>

      <p style="margin-top:12px; font-size:14px; color:#4b5563;">
        ⏰ This invitation link will expire in <strong>48 hours</strong>.
      </p>

      <p style="font-size:14px; color:#6b7280;">
        If you were not expecting this invitation, you can safely ignore this email.
      </p>

      <br />

      <p>
        — <strong>SaaS Notes Team</strong>
      </p>
    </div>
  `;
};


