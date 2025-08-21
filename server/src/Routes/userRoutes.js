import { Router } from "express";
import {
  addFriendController,
  addtoFriendListController,
  getUserFriendsController,
  signInController,
  signUpController,
  verifyOtpController,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/signup", signUpController);
router.post("/verify", verifyOtpController);
router.post("/signin", signInController);
router.post("/addfriend", isAuthenticated, addFriendController);
router.post("/addtofriendlist", isAuthenticated, addtoFriendListController);
router.get("/friends", isAuthenticated, getUserFriendsController);
export default router;
