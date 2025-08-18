import { Router } from "express";
import {
  signInController,
  signUpController,
  verifyOtpController,
} from "../controllers/userController.js";

const router = Router();
router.post("/signup", signUpController);
router.post("/verify", verifyOtpController);
router.post("/signin", signInController);
export default router;
