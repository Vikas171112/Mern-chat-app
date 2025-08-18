import dotenv from "dotenv";
dotenv.config();
export const MONGO_URL = process.env.MONGO_URL;
export const SMTP_MAIL = process.env.SMTP_MAIL;
export const APP_PASSWORD = process.env.APP_PASSWORD;
export const JWT_SECRET = process.env.APP_PASSWORD;
