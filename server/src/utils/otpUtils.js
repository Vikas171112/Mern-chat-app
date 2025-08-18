import crypto from "crypto";
export function generateOtp() {
  const otp = crypto.randomInt(1000, 10000);
  return otp.toString();
}
