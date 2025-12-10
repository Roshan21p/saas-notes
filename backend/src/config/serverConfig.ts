import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const DB_URL  = process.env.DB_URL || "";

export const JWT_SECRET: string  = process.env.JWT_SECRET!; // Use non-null assertion

export const JWT_EXPIRY: string  = process.env.JWT_EXPIRY!; // Use non-null assertion
