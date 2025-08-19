import { json } from "express";
import {
  addFriendService,
  addtoFriendList,
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
export const addFriendController = async (req, res) => {
  try {
    const { email: usertoaddemail } = req.body; // jis bande ko add karna hai
    const loggedinuseremail = req.user.email;

    const response = await addFriendService(loggedinuseremail, usertoaddemail);

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
export const addtoFriendListController = async (req, res) => {
  try {
    const userId = req.user._id; // yeh login hone ke baad middleware se mil raha hai
    const { friendId } = req.body; // body se sirf friendId destructure karo

    const response = await addtoFriendList(userId, friendId);

    return res.status(200).json({
      success: true,
      message: "Friend Added Successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
