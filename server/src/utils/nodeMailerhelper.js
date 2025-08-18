import { transporter } from "../config/nodeMailerConfig.js";
import { SMTP_MAIL } from "../config/serverConfig.js";

export const sendMail = async (to, subject, text) => {
  await transporter.sendMail({
    from: SMTP_MAIL,
    to,
    subject,
    text,
  });
};
