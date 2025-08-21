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
export const addFriendService = async (loggedinuseremail, usertoaddemail) => {
  try {
    const usertoAdd = await userRepository.getUserByEmail(usertoaddemail);
    if (!usertoAdd) {
      throw new Error("User Not Found With this Email");
    }

    const loggedinUser = await userRepository.getUserByEmail(loggedinuseremail);
    if (!loggedinUser) {
      throw new Error("Logged-in User Not Found");
    }

    if (usertoAdd.friends.includes(loggedinUser._id)) {
      throw new Error("You are already friends");
    }

    if (usertoAdd.friendRequests.includes(loggedinUser._id)) {
      throw new Error("Friend request already sent");
    }

    usertoAdd.friendRequests.push(loggedinUser._id);

    await usertoAdd.save();

    return { message: "Friend request sent successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addtoFriendList = async (userId, friendId) => {
  try {
    const activeUser = await userRepository.getById(userId);
    if (!activeUser) {
      throw new Error("Login with a valid user first");
    }
    const friendUser = await userRepository.getById(friendId);
    if (!friendUser) {
      throw new Error("User with this id not found");
    }

    if (activeUser.friends.includes(friendId)) {
      throw new Error("Already in friend list");
    }

    activeUser.friends = [...activeUser.friends, friendId];
    friendUser.friends = [...friendUser.friends, userId];

    await activeUser.save();
    await friendUser.save();

    return {
      activeUser: activeUser.friends,
      friendUser: friendUser.friends,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getUserFriendsService = async (id) => {
  try {
    const friends = await userRepository.getUserFriends(id);
    return friends;
  } catch (error) {
    throw error;
  }
};
