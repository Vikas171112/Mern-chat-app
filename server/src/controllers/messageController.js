import {
  getMessageServiceByconversation,
  sendMessageService,
} from "../services/messageService.js";

export const sendMessageController = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user.id;

    if (!senderId || !receiverId || !text) {
      return res
        .status(400)
        .json({ error: "senderId, receiverId and text are required" });
    }

    const message = await sendMessageService({ senderId, receiverId, text });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Error in sendMessageController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessagesByConversationController = async (req, res) => {
  try {
    const { convoId } = req.params;

    if (!convoId) {
      return res.status(400).json({ error: "Conversation ID is required" });
    }

    const messages = await getMessageServiceByconversation(convoId);

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error in getMessagesByConversationController:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
