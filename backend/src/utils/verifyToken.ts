import jwt from "jsonwebtoken";
import { AppError } from "./AppError";
import { JWT_SECRET } from "../config/serverConfig";

interface JwtPayload {
  id: string;
  email: string;
  role: "Admin" | "Member";
  tenantId: string;
}

// -------- Type Guard to Validate Token Shape -------- //
function isJwtPayload(obj: any): obj is JwtPayload {
  return (
    obj &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.email === "string" &&
    typeof obj.role === "string" &&
    (obj.role === "Admin" || obj.role === "Member") &&
    typeof obj.tenantId === "string"
  );
}

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);

  // Validate the structure of decoded token
  if (!isJwtPayload(decoded)) {
    throw new AppError(401, "Unauthorized: Invalid token payload");
  }

  return decoded;
};
