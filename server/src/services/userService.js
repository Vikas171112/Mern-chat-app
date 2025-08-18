import userRepository from "../repositories/userRepository.js";
import { generateToken } from "../utils/authUtils.js";
import { sendMail } from "../utils/nodeMailerhelper.js";
import { generateOtp } from "../utils/otpUtils.js";
import bcrypt from "bcrypt";

export const SignUpService = async ({ name, email, password }) => {
  const existing = await userRepository.getUserByEmail(email);
  if (existing) throw new Error("Email Already Registered");

  const otp = String(generateOtp());
  const otpExpiry = Date.now() + 20 * 60 * 1000; // 5 min validity

  const newUser = await userRepository.create({
    name,
    email,
    password,
    otpToken: otp,
    otpExpiry,
    isVerified: false,
  });

  await sendMail(email, "Verification OTP", `Your OTP is ${otp}`);
  return newUser;
};

export const verifyOtpService = async ({ email, otp }) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User Doesn't Exist in database");
    }
    if (user.otpToken !== otp) {
      throw new Error("Invalid Otp");
    }
    if (user.otpExpiry < Date.now()) {
      throw new Error("Otp Has Expired");
    }
    user.isVerified = true;
    user.otpToken = null;
    user.otpExpiry = null;
    await user.save();
    return { message: "Email Verified Successfully" };
  } catch (error) {
    throw error;
  }
};

export const signInService = async ({ email, password }) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Password");
    }
    const token = generateToken({ email: user.email, id: user.id });
    return { token, user };
  } catch (error) {
    throw error;
  }
};
