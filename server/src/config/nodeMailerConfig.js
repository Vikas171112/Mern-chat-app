import nodemailer from "nodemailer";
import { SMTP_MAIL, APP_PASSWORD } from "./serverConfig.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});
