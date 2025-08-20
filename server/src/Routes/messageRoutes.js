import { Router } from "express";
import {
  sendMessageController,
  getMessagesByConversationController,
} from "../controllers/messageController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

// Send a message
router.post("/send", isAuthenticated, sendMessageController);

// Get all messages of a conversation
router.get("/:convoId", getMessagesByConversationController);

export default router;
