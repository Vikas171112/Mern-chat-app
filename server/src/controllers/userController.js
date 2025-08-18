import { json } from "express";
import {
  signInService,
  SignUpService,
  verifyOtpService,
} from "../services/userService.js";

export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await SignUpService({ name, email, password });
    return res.status(201).json({
      succcess: true,
      data: response,
      message: "User Created SuccessFully",
    });
  } catch (error) {
    return res.status(400).json({
      succcess: false,
      message: error.message,
    });
  }
};
export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await verifyOtpService({ email, otp });

    return res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await signInService({ email, password });
    return res.status(200).json({
      success: true,
      message: "Logged In SuccessFully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
